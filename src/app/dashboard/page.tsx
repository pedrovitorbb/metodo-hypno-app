'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const modules = [
  {
    imageUrl: 'https://i.imgur.com/85NgJNK.png',
  },
  {
    imageUrl: 'https://i.imgur.com/xJHXKjI.png',
  },
  {
    imageUrl: 'https://i.imgur.com/JvvCofs.png',
  },
  {
    imageUrl: 'https://i.imgur.com/zdWkm8s.png',
  },
  {
    imageUrl: 'https://i.imgur.com/pMo3NKr.png',
  },
  {
    imageUrl: 'https://i.imgur.com/OIBJvzm.png',
  },
  {
    imageUrl: 'https://i.imgur.com/zElS168.png',
  },
  {
    imageUrl: 'https://i.imgur.com/4w9q4jI.png',
  },
  {
    imageUrl: 'https://i.imgur.com/alCDUIE.png',
  },
];

const CarouselCard = ({ item, index }: { item: typeof modules[0], index: number }) => {
  return (
    <Link href={`/dashboard/module/${index}`} className="block group">
      <Card className="overflow-hidden bg-card shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-primary">
        <CardContent className="relative flex aspect-[3/4] items-center justify-center p-0">
          <Image
            src={item.imageUrl}
            alt={`Módulo ${index + 1}`}
            fill
            className="object-contain"
            data-ai-hint="course module"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardContent>
      </Card>
    </Link>
  );
}

const WelcomeHeader = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-80 mx-auto" />
  }

  return (
    <h1 className="mb-12 text-center text-4xl font-bold text-primary-foreground">
      Bem-vindo(a), {user?.displayName || 'Membro'}!
    </h1>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full bg-background py-12">
      <div className="container mx-auto">
        <WelcomeHeader />
        <div className="flex justify-center">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent className="-ml-4">
              {modules.map((item, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <CarouselCard item={item} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-accent hover:text-accent-foreground border-accent hover:bg-accent" />
            <CarouselNext className="text-accent hover:text-accent-foreground border-accent hover:bg-accent" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
