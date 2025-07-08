import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

/**
 * Endpoint da API para receber webhooks da Kirvano.
 * Cria um novo usuário no Firebase Authentication quando uma compra é aprovada.
 */
export async function POST(request: Request) {
  const kirvanoSecret = process.env.KIRVANO_WEBHOOK_SECRET;
  const incomingSecret = request.headers.get('x-kirvano-secret');

  // 1. Verificação de Segurança
  // Garante que a requisição é legítima, comparando o segredo do header com o segredo no ambiente.
  if (!kirvanoSecret || incomingSecret !== kirvanoSecret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const payload = await request.json();

    // 2. Extração dos Dados do Cliente
    // O formato do payload pode variar. Verifique a documentação da Kirvano.
    // Este é um exemplo comum: { data: { buyer: { email: '...', name: '...' } } }
    const { email, name } = payload.data?.buyer || {};
    
    if (!email) {
      return new NextResponse('E-mail do cliente não encontrado no payload', { status: 400 });
    }

    // 3. Criação do Usuário no Firebase
    // Gera uma senha aleatória. O usuário usará o fluxo "Esqueceu a senha?" para definir sua própria senha no primeiro login.
    const randomPassword = Math.random().toString(36).slice(-10);

    const userRecord = await adminAuth.createUser({
      email: email,
      emailVerified: true, // O e-mail da compra é considerado verificado.
      displayName: name,
      password: randomPassword,
      disabled: false,
    });

    console.log(`Usuário criado com sucesso: ${userRecord.uid}`);

    return new NextResponse(JSON.stringify({ success: true, userId: userRecord.uid }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error: any) {
    console.error('Erro ao processar webhook da Kirvano:', error);
    
    // Se o usuário já existe, não é um erro. Apenas confirme o sucesso.
    if (error.code === 'auth/email-already-exists') {
      return new NextResponse(JSON.stringify({ success: true, message: 'Usuário já existe.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
