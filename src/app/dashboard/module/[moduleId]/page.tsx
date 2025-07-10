'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const modules = [
    { pdfUrl: 'https://drive.google.com/file/d/1RYuOR2lHkr-PHa3AUtJ-lEdoYFFkE8ZM/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/112qJkCaY9TP9YTeNBtf7UWwKqUQgWdQF/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/1-j_t0cxp9DxzpdPjhm-_nCQi9Ms41-JI/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/13g5B5CkNgPrifLsbRVmuFn_Y0I_-oFAD/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/1JmrWf1SkoYPQkrQ9FWLNTR6Lx8HG6TDZ/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/14E6RyFFMZgHcjy6xbVJGXoibQxh0RWIs/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/1AnXbEeWC9dEG5equDSt12lyqxJFrSiyc/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/1DQI91MVMuw0US_dY-jkyIRx-7vfV9z7F/preview' },
    { pdfUrl: 'https://drive.google.com/file/d/15r77W9nTfCjAIbEyo5jf-8EDtTrb4HIA/preview' },
];

export default function ModuleViewPage() {
  const params = useParams();
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
  const moduleIndex = parseInt(moduleId, 10);
  const moduleData = modules[moduleIndex];

  if (isNaN(moduleIndex) || !moduleData) {
    return (
        <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-2xl font-bold text-destructive">Módulo não encontrado</h1>
             <Link href="/dashboard" className="mt-4">
                 <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Painel
                </Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow bg-background py-8">
      <div className="container mx-auto flex-grow flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-foreground">Módulo {moduleIndex + 1}</h1>
            <Link href="/dashboard">
                <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Painel
                </Button>
            </Link>
        </div>
        <Card className="flex-grow rounded-lg overflow-hidden border-2 shadow-lg">
          <iframe
            src={moduleData.pdfUrl.replace("/view?usp=drive_link", "/preview")}
            className="h-full w-full"
            title={`Módulo ${moduleIndex + 1}`}
            allow="fullscreen"
          />
        </Card>
      </div>
    </div>
  );
}
