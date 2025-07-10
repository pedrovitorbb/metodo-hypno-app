'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { AuthContext } from '@/context/auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get their ID token which contains custom claims
        // Force refresh to get latest claims if they were just set.
        const idTokenResult = await user.getIdTokenResult(true);
        // The 'plan' claim is set by the Kirvano webhook. Default to 'basic'.
        const userPlan = (idTokenResult.claims.plan as string) || 'basic';
        
        setUser(user);
        setPlan(userPlan);

      } else {
        // User is signed out, clear user and plan
        setUser(null);
        setPlan(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = { user, loading, plan };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
