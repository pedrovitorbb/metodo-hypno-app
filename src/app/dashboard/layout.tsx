'use client';

<<<<<<< HEAD
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
=======
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader } from '@/components/ui/loader';
import { DashboardHeader } from '@/components/dashboard-header';
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
=======
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader className="h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
    </div>
  );
}
