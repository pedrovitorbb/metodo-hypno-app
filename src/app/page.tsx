<<<<<<< HEAD
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
=======
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader } from '@/components/ui/loader';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader className="h-12 w-12 text-primary" />
    </div>
  );
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
}
