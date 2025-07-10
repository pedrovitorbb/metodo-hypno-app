'use client';

import { useEffect, useState } from 'react';
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
  
  const [status, setStatus] = useState<'loading' | 'locked' | 'valid' | 'invalid'>('loading');

  const module = modules.find((m) => m.id === moduleId);
  
  useEffect(() => {
    if (authLoading) {
      // Auth is still loading, do nothing yet.
      return;
    }

    if (!module) {
      // Module ID is invalid, redirect.
      setStatus('invalid');
      router.replace('/dashboard');
      return;
    }

    const isPremiumModule = parseInt(moduleId.replace('module', ''), 10) > 3;
    const isLocked = plan !== 'premium' && isPremiumModule;

    if (isLocked) {
      // User doesn't have access, show locked state.
      setStatus('locked');
    } else {
      // User has access.
      setStatus('valid');
    }
  }, [authLoading, plan, moduleId, module, router]);


  if (status === 'loading') {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background text-center">
        <Loader className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (status === 'locked') {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background text-center">
        <Lock className="h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Acesso Restrito</h1>
        <p className="mt-2 text-muted-foreground">Faça o upgrade para acessar este módulo.</p>
        <Link href="/dashboard" passHref>
          <Button variant="outline" className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>
      </div>
    );
  }

  if (status === 'valid' && module) {
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

  // Fallback for invalid status or other edge cases, shows a loader.
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background text-center">
      <Loader className="h-12 w-12 text-primary" />
    </div>
  );
}
