<<<<<<< HEAD

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, Circle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { Skeleton } from '@/components/ui/skeleton';

const modules = [
    { title: "Introducción", pdfUrl: 'https://drive.google.com/file/d/1RYuOR2lHkr-PHa3AUtJ-lEdoYFFkE8ZM/view?usp=drive_link' },
    { title: "Estrategias", pdfUrl: 'https://drive.google.com/file/d/112qJkCaY9TP9YTeNBtf7UWwKqUQgWdQF/view?usp=drive_link' },
    { title: "Implementación", pdfUrl: 'https://drive.google.com/file/d/1-j_t0cxp9DxzpdPjhm-_nCQi9Ms41-JI/view?usp=drive_link' },
    { title: "Pruebas", pdfUrl: 'https://drive.google.com/file/d/13g5B5CkNgPrifLsbRVmuFn_Y0I_-oFAD/view?usp=drive_link' },
    { title: "Escalado", pdfUrl: 'https://drive.google.com/file/d/1JmrWf1SkoYPQkrQ9FWLNTR6Lx8HG6TDZ/view?usp=drive_link' },
    { title: "Módulo 6", pdfUrl: 'https://drive.google.com/file/d/14E6RyFFMZgHcjy6xbVJGXoibQxh0RWIs/view?usp=drive_link' },
    { title: "Módulo 7", pdfUrl: 'https://drive.google.com/file/d/1AnXbEeWC9dEG5equDSt12lyqxJFrSiyc/view?usp=drive_link' },
    { title: "Módulo 8", pdfUrl: 'https://drive.google.com/file/d/1DQI91MVMuw0US_dY-jkyIRx-7vfV9z7F/view?usp=drive_link' },
    { title: "Módulo 9", pdfUrl: 'https://drive.google.com/file/d/15r77W9nTfCjAIbEyo5jf-8EDtTrb4HIA/view?usp=drive_link' },
];

const ModuleViewSkeleton = () => (
    <div className="flex flex-col flex-grow bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-3xl">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                 <Skeleton className="h-5 w-32 mb-2" />
                 <Skeleton className="h-9 w-64" />
              </div>
              <Skeleton className="h-10 w-48" />
            </div>
            <Card className="flex-grow rounded-lg border-2 border-border/50 shadow-lg bg-card/50 backdrop-blur-sm text-center">
              <CardHeader>
                <Skeleton className="h-6 w-40 mx-auto" />
                <Skeleton className="h-4 w-72 mx-auto mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-44 mx-auto" />
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
)

export default function ModuleViewPage() {
  const params = useParams();
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
  const moduleIndex = parseInt(moduleId, 10);
  
  const { user, loading: authLoading } = useAuth();
  const { progress, toggleModuleCompletion, loading: progressLoading } = useProgress(user?.uid);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLoading = authLoading || progressLoading || !isClient;

  if (isLoading) {
    return <ModuleViewSkeleton />;
  }

  if (isNaN(moduleIndex) || moduleIndex < 0 || moduleIndex >= modules.length) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent text-foreground">
        <h1 className="text-2xl font-bold text-destructive">Módulo no encontrado</h1>
        <Link href="/dashboard" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
=======
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
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
          </Button>
        </Link>
      </div>
    );
  }

<<<<<<< HEAD
  const moduleData = modules[moduleIndex];
  const isCompleted = progress.completedModules.includes(moduleIndex);

  const handleToggleCompletion = () => {
    if (user) {
      toggleModuleCompletion(moduleIndex);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-3xl">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Panel
                </Link>
                <h1 className="text-3xl font-bold text-foreground">{moduleData.title}</h1>
              </div>
              <Button onClick={handleToggleCompletion} disabled={progressLoading} variant={isCompleted ? "default" : "outline"} className="transition-all duration-300">
                {isCompleted ? <CheckCircle className="mr-2 h-5 w-5" /> : <Circle className="mr-2 h-5 w-5" />}
                {isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}
              </Button>
            </div>
            <Card className="flex-grow rounded-lg border-2 border-border/50 shadow-lg bg-card/50 backdrop-blur-sm text-center">
              <CardHeader>
                <CardTitle>Material del Módulo</CardTitle>
                <CardDescription>Haz clic en el botón de abajo para acceder al contenido.</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={moduleData.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Abrir Material
                  </Button>
                </a>
              </CardContent>
            </Card>
        </div>
      </div>
=======
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
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
    </div>
  );
}
