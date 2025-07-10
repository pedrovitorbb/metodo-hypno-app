'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Circle, BookOpen } from 'lucide-react';

const modules = [
  { title: "Introdução" },
  { title: "Estratégias" },
  { title: "Implementação" },
  { title: "Testes" },
  { title: "Escala" },
];

const ModuleCard = ({ title, index, isCompleted }: { title: string, index: number, isCompleted: boolean }) => {
  return (
    <Link href={`/dashboard/module/${index}`} className="block group">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/80 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-foreground">{title}</CardTitle>
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow flex items-end">
            {isCompleted ?
                <div className="text-xs text-green-400 flex items-center font-semibold">
                    <CheckCircle className="mr-1.5 h-4 w-4"/> Concluído
                </div>
                :
                <div className="text-xs text-muted-foreground flex items-center">
                    <Circle className="mr-1.5 h-4 w-4"/> Pendente
                </div>
            }
        </CardContent>
      </Card>
    </Link>
  );
};

const WelcomeHeader = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-80 mb-12" />;
  }

  return (
    <h1 className="mb-12 text-center text-4xl font-bold text-foreground">
      Bem-vindo(a) de volta, {user?.displayName || 'Membro'}!
    </h1>
  );
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading } = useProgress(user?.uid);
  
  const isLoading = authLoading || progressLoading;

  return (
    <div className="flex flex-col w-full flex-grow items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto text-center">
        <WelcomeHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-36 w-full bg-card/80" />
            ))
          ) : (
            modules.map((item, index) => (
              <ModuleCard 
                key={index} 
                title={item.title} 
                index={index} 
                isCompleted={progress.completedModules.includes(index)} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
