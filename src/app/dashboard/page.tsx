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
      </div>
    </div>
  );
}
