'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { modules } from '@/lib/modules-data';
import { useAuth } from '@/hooks/use-auth';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const { moduleId } = params;
  const router = useRouter();
  const { plan, loading: authLoading } = useAuth();
  const module = modules.find((m) => m.id === moduleId);

  const isLocked = plan !== 'premium' && parseInt(moduleId.replace('module', ''), 10) > 3;

  useEffect(() => {
    // If auth is done loading and the user is trying to access a locked module, redirect them.
    if (!authLoading && isLocked) {
      router.replace('/dashboard');
    }
  }, [authLoading, isLocked, router]);
  
  // Handle case where module ID is invalid
  useEffect(() => {
    if (!authLoading && !module) {
      router.replace('/dashboard');
    }
  }, [module, authLoading, router]);

  if (authLoading || (isLocked && plan) || !module) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background text-center">
        {isLocked ? (
          <>
            <Lock className="h-12 w-12 text-primary" />
            <h1 className="mt-4 text-2xl font-bold">Acesso Restrito</h1>
            <p className="mt-2 text-muted-foreground">Faça o upgrade para acessar este módulo.</p>
            <Link href="/dashboard" passHref>
              <Button variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Painel
              </Button>
            </Link>
          </>
        ) : (
          <Loader className="h-12 w-12 text-primary" />
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>
        <div className="mt-4">
          <h1 className="font-headline text-4xl font-bold">{module.title}</h1>
        </div>
      </div>

      {module.pdfUrl && (
        <div className="mt-8">
          <iframe
            src={module.pdfUrl.replace('/view?usp=drive_link', '/preview')}
            className="h-[80vh] w-full rounded-lg border"
            allow="fullscreen"
          ></iframe>
        </div>
      )}
    </div>
  );
}
