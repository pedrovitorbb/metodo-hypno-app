<<<<<<< HEAD

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
    { title: "Introducción", imageUrl: "https://i.imgur.com/85NgJNK.png" },
    { title: "Estrategias", imageUrl: "https://i.imgur.com/xJHXKjI.png" },
    { title: "Implementación", imageUrl: "https://i.imgur.com/JvvCofs.png" },
    { title: "Pruebas", imageUrl: "https://i.imgur.com/zdWkm8s.png" },
    { title: "Escalado", imageUrl: "https://i.imgur.com/pMo3NKr.png" },
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
                 <Image src={imageUrl} alt={`Portada del módulo ${title}`} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 bg-card/80">
                {isCompleted ?
                    <div className="text-xs text-green-400 flex items-center font-semibold">
                        <CheckCircle className="mr-1.5 h-4 w-4"/> Completado
                    </div>
                    :
                    <div className="text-xs text-muted-foreground flex items-center">
                        <Circle className="mr-1.5 h-4 w-4"/> Pendiente
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
      ¡Bienvenido(a) de vuelta, {user?.displayName || 'Miembro'}!
    </h1>
  );
};

const DashboardSkeleton = () => {
    return (
        <div className="flex flex-col w-full flex-grow items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto text-center">
                <Skeleton className="h-10 w-80 mb-12 mx-auto" />
                <div className="w-full max-w-3xl mx-auto mb-12">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-1/3 ml-auto" />
                    </div>
                </div>
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Skeleton className="h-[30rem] w-full bg-card/80" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </div>
    );
};


export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading } = useProgress(user?.uid);
  
  const isLoading = authLoading || progressLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  const totalModules = modules.length;
  const completedModulesCount = progress.completedModules.length;
  const progressPercentage = totalModules > 0 ? (completedModulesCount / totalModules) * 100 : 0;

  return (
    <div className="flex flex-col w-full flex-grow items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto text-center">
        <WelcomeHeader />

        <div className="w-full max-w-3xl mx-auto mb-12">
            <>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-foreground">Tu Progreso</p>
                    <p className="font-bold text-primary text-lg">{`${Math.round(progressPercentage)}%`}</p>
                </div>
                <Progress value={progressPercentage} className="w-full h-3" />
                <p className="text-sm text-muted-foreground mt-2 text-right">{`${completedModulesCount} de ${totalModules} módulos completados`}</p>
            </>
        </div>

        <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
                {modules.map((item, index) => (
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
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
=======
'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';
import { modules } from '@/lib/modules-data';
import { useAuth } from '@/hooks/use-auth';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { plan, loading: authLoading } = useAuth();

  const isModuleLocked = (moduleId: string) => {
    const moduleNumber = parseInt(moduleId.replace('module', ''), 10);
    // Modules with number > 3 are locked for any plan other than 'premium'
    return plan !== 'premium' && moduleNumber > 3;
  };
  
  if (authLoading) {
      return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-6 w-3/4 mt-2" />
            </div>
             <div className="flex justify-center px-12">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">¡Bienvenido!</h1>
        <p className="text-lg text-muted-foreground">Seu progresso e módulos disponíveis.</p>
      </div>

      <div className="flex justify-center px-12">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl"
        >
          <CarouselContent>
            {modules.map((module) => (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                   {isModuleLocked(module.id) ? (
                     <div className="relative block group h-full rounded-lg border border-dashed border-border flex flex-col items-center justify-center p-6 text-center bg-card/50">
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg z-10"></div>
                        <div className="relative z-20 flex flex-col items-center">
                            <Lock className="h-10 w-10 text-primary mb-4"/>
                            <h3 className="text-lg font-bold text-foreground">{module.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">Disponível no plano Premium.</p>
                        </div>
                     </div>
                   ) : (
                    <Link href={`/dashboard/module/${module.id}`} className="block group">
                     <img 
                        src={module.imageUrl} 
                        alt={module.title}
                        className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                     />
                    </Link>
                   )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
      </div>
    </div>
  );
}
