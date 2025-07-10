
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';

const modules = [
    { title: "Introdução", pdfUrl: 'https://drive.google.com/file/d/1RYuOR2lHkr-PHa3AUtJ-lEdoYFFkE8ZM/view?usp=drive_link' },
    { title: "Estratégias", pdfUrl: 'https://drive.google.com/file/d/112qJkCaY9TP9YTeNBtf7UWwKqUQgWdQF/view?usp=drive_link' },
    { title: "Implementação", pdfUrl: 'https://drive.google.com/file/d/1-j_t0cxp9DxzpdPjhm-_nCQi9Ms41-JI/view?usp=drive_link' },
    { title: "Testes", pdfUrl: 'https://drive.google.com/file/d/13g5B5CkNgPrifLsbRVmuFn_Y0I_-oFAD/view?usp=drive_link' },
    { title: "Escala", pdfUrl: 'https://drive.google.com/file/d/1JmrWf1SkoYPQkrQ9FWLNTR6Lx8HG6TDZ/view?usp=drive_link' },
];

export default function ModuleViewPage() {
  const params = useParams();
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
  const moduleIndex = parseInt(moduleId, 10);
  
  const { user } = useAuth();
  const { progress, toggleModuleCompletion, loading: progressLoading } = useProgress(user?.uid);

  if (isNaN(moduleIndex) || moduleIndex < 0 || moduleIndex >= modules.length) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent text-foreground">
        <h1 className="text-2xl font-bold text-destructive">Módulo não encontrado</h1>
        <Link href="/dashboard" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>
      </div>
    );
  }

  const moduleData = modules[moduleIndex];
  const isCompleted = progress.completedModules.includes(moduleIndex);

  const handleToggleCompletion = () => {
    if (user) {
      toggleModuleCompletion(moduleIndex);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex-grow flex flex-col h-full">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Painel
            </Link>
            <h1 className="text-3xl font-bold text-foreground">{moduleData.title}</h1>
          </div>
          <Button onClick={handleToggleCompletion} disabled={progressLoading} variant={isCompleted ? "default" : "outline"} className="transition-all duration-300">
            {isCompleted ? <CheckCircle className="mr-2 h-5 w-5" /> : <Circle className="mr-2 h-5 w-5" />}
            {isCompleted ? 'Módulo Concluído' : 'Marcar como Concluído'}
          </Button>
        </div>
        <Card className="flex-grow rounded-lg overflow-hidden border-2 border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
          <iframe
            src={moduleData.pdfUrl.replace("/view?usp=drive_link", "/preview")}
            className="h-full w-full"
            title={moduleData.title}
            allow="fullscreen"
          />
        </Card>
      </div>
    </div>
  );
}
