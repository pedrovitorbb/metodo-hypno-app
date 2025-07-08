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
            return 'Este e-mail já está em uso.';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres.';
        default:
            return 'Ocorreu um erro. Tente novamente.';
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
