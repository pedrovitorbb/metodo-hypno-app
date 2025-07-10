import { createContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  plan: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
