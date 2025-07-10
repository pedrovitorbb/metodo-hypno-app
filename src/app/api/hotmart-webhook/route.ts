'use server';

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

/**
 * Endpoint da API para receber webhooks da Hotmart (Listboss).
 * Cria ou atualiza um usuário no Firebase, atribuindo um plano com base no produto comprado.
 */
export async function POST(request: Request) {
  // 1. Extrair dados e o token de segurança da Hotmart
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  const hotmartToken = process.env.HOTMART_WEBHOOK_SECRET;
  const incomingToken = data.hottok as string;

  // 2. Verificação de Segurança
  if (!hotmartToken || incomingToken !== hotmartToken) {
    console.warn('Webhook da Hotmart: Unauthorized. Token inválido ou ausente.');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 3. Verificação do Status da Compra
    // Processar apenas se a compra for aprovada
    if (data.status !== 'approved') {
        return new NextResponse(JSON.stringify({ success: true, message: `Status '${data.status}' ignorado.` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 4. Extração dos Dados do Payload
    const email = data.email as string;
    const name = data.name as string;
    const productId = data.prod as string;

    if (!email) {
      return new NextResponse('E-mail do cliente não encontrado no payload', { status: 400 });
    }
    
    // 5. Determinar o Plano do Usuário
    let plan = 'basic';
    // O ID '5856333' corresponde ao produto premium
    if (productId && productId.toString() === '5856333') {
      plan = 'premium';
    }

    // 6. Encontrar ou Criar Usuário no Firebase
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      console.log(`Usuário encontrado na Hotmart: ${userRecord.uid}. Atualizando plano...`);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        const randomPassword = Math.random().toString(36).slice(-10);
        userRecord = await adminAuth.createUser({
          email: email,
          emailVerified: true,
          displayName: name,
          password: randomPassword,
          disabled: false,
        });
        console.log(`Usuário da Hotmart criado com sucesso: ${userRecord.uid}`);
      } else {
        throw error;
      }
    }

    // 7. Definir Custom Claims (Plano do usuário)
    await adminAuth.setCustomUserClaims(userRecord.uid, { plan: plan });
    console.log(`Custom claim '{ plan: "${plan}" }' definido para o usuário ${userRecord.uid} via Hotmart`);

    return new NextResponse(JSON.stringify({ success: true, userId: userRecord.uid, plan: plan }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Erro ao processar webhook da Hotmart:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
