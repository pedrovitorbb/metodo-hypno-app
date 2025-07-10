'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const modules = [
  {
    title: 'Módulo 1',
    image: 'https://i.imgur.com/85NgJNK.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 2',
    image: 'https://i.imgur.com/xJHXKjI.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 3',
    image: 'https://i.imgur.com/JvvCofs.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 4',
    image: 'https://i.imgur.com/zdWkm8s.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 5',
    image: 'https://i.imgur.com/pMo3NKr.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 6',
    image: 'https://i.imgur.com/OIBJvzm.png',
    dataAiHint: 'course module',
  },
   {
    title: 'Módulo 7',
    image: 'https://i.imgur.com/zElS168.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 8',
    image: 'https://i.imgur.com/4w9q4jI.png',
    dataAiHint: 'course module',
  },
  {
    title: 'Módulo 9',
    image: 'https://i.imgur.com/alCDUIE.png',
    dataAiHint: 'course module',
  },
];

export default function DashboardPage() {
  return (
    <div className="w-full bg-white py-12">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold text-[#003366]">
          Módulos do Curso
        </h1>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {modules.map((mod, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden rounded-lg border-4 border-[#003366] shadow-lg transition-transform duration-300 hover:scale-105">
                    <CardContent className="relative aspect-[2/3] p-0">
                      <Image
                        src={mod.image}
                        alt={mod.title}
                        fill
                        className="object-cover"
                        data-ai-hint={mod.dataAiHint}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14 border-[#FFD700] bg-[#003366] text-white hover:bg-blue-800 hover:text-white" />
          <CarouselNext className="mr-14 border-[#FFD700] bg-[#003366] text-white hover:bg-blue-800 hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
}
