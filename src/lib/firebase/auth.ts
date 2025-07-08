import {
  auth,
} from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type AuthError
} from 'firebase/auth';

const isAuthError = (error: unknown): error is AuthError => {
    return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
};

const getFriendlyErrorMessage = (error: AuthError): string => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'O formato do e-mail é inválido.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'E-mail ou senha incorretos.';
        case 'auth/email-already-in-use':
            return 'Este e-mail já está em uso. Por favor, tente fazer login.';
        case 'auth/weak-password':
            return 'A senha deve ter no mínimo 6 caracteres.';
        case 'auth/operation-not-allowed':
            return 'O método de login por e-mail/senha não está ativado. Por favor, vá para o Console do Firebase > Authentication > Sign-in method e ative o provedor de E-mail/Senha.';
        default:
            return 'Ocorreu um erro inesperado. Por favor, tente novamente.';
    }
}

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    if (isAuthError(error)) {
        return { user: null, error: getFriendlyErrorMessage(error) };
    }
    return { user: null, error: 'Ocorreu um erro desconhecido.' };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    if (isAuthError(error)) {
        return { user: null, error: getFriendlyErrorMessage(error) };
    }
    return { user: null, error: 'Ocorreu um erro desconhecido.' };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
     if (isAuthError(error)) {
        return { error: getFriendlyErrorMessage(error) };
    }
    return { error: 'Ocorreu um erro desconhecido ao sair.' };
  }
};

export const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { error: null };
    } catch (error) {
        if (isAuthError(error)) {
            return { error: getFriendlyErrorMessage(error) };
        }
        return { error: 'Ocorreu um erro desconhecido.' };
    }
}