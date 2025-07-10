
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Circle } from 'lucide-react';
import Image from 'next/image';

const modules = [
    { title: "Introdução", imageUrl: "https://i.imgur.com/85NgJNK.png" },
    { title: "Estratégias", imageUrl: "https://i.imgur.com/xJHXKjI.png" },
    { title: "Implementação", imageUrl: "https://i.imgur.com/JvvCofs.png" },
    { title: "Testes", imageUrl: "https://i.imgur.com/zdWkm8s.png" },
    { title: "Escala", imageUrl: "https://i.imgur.com/pMo3NKr.png" },
];

const ModuleCard = ({ title, index, isCompleted, imageUrl }: { title: string, index: number, isCompleted: boolean, imageUrl: string }) => {
  return (
    <Link href={`/dashboard/module/${index}`} className="block group">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/80 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col overflow-hidden">
        <CardContent className="p-0 flex-grow flex flex-col justify-between">
            <div className="relative w-full h-64">
                 <Image src={imageUrl} alt={`Capa do módulo ${title}`} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 bg-card/80">
                {isCompleted ?
                    <div className="text-xs text-green-400 flex items-center font-semibold">
                        <CheckCircle className="mr-1.5 h-4 w-4"/> Concluído
                    </div>
                    :
                    <div className="text-xs text-muted-foreground flex items-center">
                        <Circle className="mr-1.5 h-4 w-4"/> Pendente
                    </div>
                }
            </div>
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
                <Skeleton key={index} className="h-72 w-full bg-card/80" />
            ))
          ) : (
            modules.map((item, index) => (
              <ModuleCard 
                key={index} 
                title={item.title} 
                index={index} 
                isCompleted={progress.completedModules.includes(index)}
                imageUrl={item.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
