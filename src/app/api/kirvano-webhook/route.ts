import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

/**
 * Endpoint da API para receber webhooks da Kirvano.
 * Cria ou atualiza um usuário no Firebase, atribuindo um plano com base no produto comprado.
 */
export async function POST(request: Request) {
  const kirvanoSecret = process.env.KIRVANO_WEBHOOK_SECRET;
  const incomingSecret = request.headers.get('x-kirvano-secret');

  // 1. Verificação de Segurança
  if (!kirvanoSecret || incomingSecret !== kirvanoSecret) {
    console.warn('Webhook da Kirvano: Unauthorized. Segredo inválido ou ausente.');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const payload = await request.json();

    // 2. Extração dos Dados do Payload
    const { email, name } = payload.data?.buyer || {};
    // IMPORTANTE: Verifique a documentação da Kirvano para o caminho correto do ID do produto.
    // Exemplo: payload.data.product.id
    const productId = payload.data?.product?.id;

    if (!email) {
      return new NextResponse('E-mail do cliente não encontrado no payload', { status: 400 });
    }
    
    // 3. Determinar o Plano do Usuário
    // Por padrão, o plano é 'basic'. Se o ID do produto corresponder ao ID do plano premium,
    // o plano será 'premium'.
    let plan = 'basic';
    if (productId && productId.toString() === process.env.KIRVANO_PREMIUM_PRODUCT_ID) {
      plan = 'premium';
    }

    // 4. Encontrar ou Criar Usuário no Firebase
    let userRecord;
    try {
      // Tenta encontrar um usuário existente pelo e-mail.
      userRecord = await adminAuth.getUserByEmail(email);
      console.log(`Usuário encontrado: ${userRecord.uid}. Atualizando plano...`);
    } catch (error: any) {
      // Se o usuário não for encontrado, cria um novo.
      if (error.code === 'auth/user-not-found') {
        const randomPassword = Math.random().toString(36).slice(-10);
        userRecord = await adminAuth.createUser({
          email: email,
          emailVerified: true,
          displayName: name,
          password: randomPassword,
          disabled: false,
        });
        console.log(`Usuário criado com sucesso: ${userRecord.uid}`);
      } else {
        // Se for outro erro, lança-o.
        throw error;
      }
    }

    // 5. Definir Custom Claims (Plano do usuário)
    // Isso anexa o plano ao token de autenticação do usuário.
    await adminAuth.setCustomUserClaims(userRecord.uid, { plan: plan });
    console.log(`Custom claim '{ plan: "${plan}" }' definido para o usuário ${userRecord.uid}`);

    return new NextResponse(JSON.stringify({ success: true, userId: userRecord.uid, plan: plan }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Erro ao processar webhook da Kirvano:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
