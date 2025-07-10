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
    title: 'Introdução à Hipnoterapia',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600',
    dataAiHint: 'welcome introduction',
  },
  {
    title: 'Técnicas de Indução',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600',
    dataAiHint: 'hypnosis technique',
  },
  {
    title: 'Aprofundamento do Transe',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600',
    dataAiHint: 'deep focus',
  },
  {
    title: 'Sugestões Terapêuticas',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600',
    dataAiHint: 'therapy session',
  },
  {
    title: 'Tratamento de Fobias',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600',
    dataAiHint: 'overcoming fear',
  },
  {
    title: 'Controle da Dor',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600',
    dataAiHint: 'pain relief',
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
