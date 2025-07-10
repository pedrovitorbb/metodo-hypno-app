
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Circle } from 'lucide-react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';

const modules = [
    { title: "Introdução", imageUrl: "https://i.imgur.com/85NgJNK.png" },
    { title: "Estratégias", imageUrl: "https://i.imgur.com/xJHXKjI.png" },
    { title: "Implementação", imageUrl: "https://i.imgur.com/JvvCofs.png" },
    { title: "Testes", imageUrl: "https://i.imgur.com/zdWkm8s.png" },
    { title: "Escala", imageUrl: "https://i.imgur.com/pMo3NKr.png" },
    { title: "Módulo 6", imageUrl: "https://imgur.com/OIBJvzm.png" },
    { title: "Módulo 7", imageUrl: "https://imgur.com/zElS168.png" },
    { title: "Módulo 8", imageUrl: "https://imgur.com/4w9q4jI.png" },
    { title: "Módulo 9", imageUrl: "https://imgur.com/alCDUIE.png" },
];

const ModuleCard = ({ title, index, isCompleted, imageUrl }: { title: string, index: number, isCompleted: boolean, imageUrl: string }) => {
  return (
    <Link href={`/dashboard/module/${index}`} className="block group">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/80 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col overflow-hidden">
        <CardContent className="p-0 flex-grow flex flex-col justify-between">
            <div className="relative w-full h-[28rem]">
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
    <h1 className="mb-6 text-center text-4xl font-bold text-foreground">
      Bem-vindo(a) de volta, {user?.displayName || 'Membro'}!
    </h1>
  );
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading } = useProgress(user?.uid);
  
  const isLoading = authLoading || progressLoading;

  const totalModules = modules.length;
  const completedModulesCount = progress.completedModules.length;
  const progressPercentage = totalModules > 0 ? (completedModulesCount / totalModules) * 100 : 0;

  return (
    <div className="flex flex-col w-full flex-grow items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto text-center">
        <WelcomeHeader />

        <div className="w-full max-w-3xl mx-auto mb-12">
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-1/3 ml-auto" />
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-semibold text-foreground">Seu Progresso</p>
                        <p className="font-bold text-primary text-lg">{`${Math.round(progressPercentage)}%`}</p>
                    </div>
                    <Progress value={progressPercentage} className="w-full h-3" />
                    <p className="text-sm text-muted-foreground mt-2 text-right">{`${completedModulesCount} de ${totalModules} módulos concluídos`}</p>
                </>
            )}
        </div>

        <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Skeleton className="h-[30rem] w-full bg-card/80" />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                modules.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                     <div className="p-1">
                        <ModuleCard 
                          title={item.title} 
                          index={index} 
                          isCompleted={progress.completedModules.includes(index)}
                          imageUrl={item.imageUrl}
                        />
                      </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
      </div>
    </div>
  );
}
