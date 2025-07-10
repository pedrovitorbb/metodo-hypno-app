'use server';

import * as admin from 'firebase-admin';

// Garante que a inicialização do app do Firebase Admin ocorra apenas uma vez.
const initializeAdminApp = () => {
  if (admin.apps.length === 0) {
    try {
      // Inicializa o SDK do Firebase Admin com as credenciais do ambiente.
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Substitui os caracteres de nova linha na chave privada, que podem ser mal interpretados pelas variáveis de ambiente.
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Erro na inicialização do Firebase Admin:', error);
    }
  }
  return admin.app();
};

const getAdminAuth = () => {
  initializeAdminApp();
  return admin.auth();
};

// Exporta a instância de autenticação do admin para ser usada em outras partes do servidor.
export const adminAuth = getAdminAuth();
