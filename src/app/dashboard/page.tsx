'use client';

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

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

export default function DashboardPage() {
  return (
    <div className="w-full bg-background py-12">
      <div className="container mx-auto">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          Módulos do Curso
        </h1>
        <div className="flex justify-center">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent>
              {modules.map((item, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 md:p-2">
                    <Card className="overflow-hidden border-2 border-primary/20 bg-card shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-primary/40">
                      <CardContent className="relative flex aspect-[3/4] items-center justify-center p-0">
                        <Image
                          src={item.imageUrl}
                          alt={`Módulo ${index + 1}`}
                          fill
                          className="object-cover"
                          data-ai-hint="course module"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary hover:text-primary-foreground hover:bg-primary" />
            <CarouselNext className="text-primary hover:text-primary-foreground hover:bg-primary" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
