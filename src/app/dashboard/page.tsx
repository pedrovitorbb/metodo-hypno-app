'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const modules = [
  {
    title: 'Introdução à Hipnoterapia',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600/001f3f/ffffff.png',
    dataAiHint: 'welcome introduction',
  },
  {
    title: 'Técnicas de Indução',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600/001f3f/ffffff.png',
    dataAiHint: 'hypnosis technique',
  },
  {
    title: 'Aprofundamento do Transe',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600/001f3f/ffffff.png',
    dataAiHint: 'deep focus',
  },
  {
    title: 'Sugestões Terapêuticas',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600/001f3f/ffffff.png',
    dataAiHint: 'therapy session',
  },
  {
    title: 'Tratamento de Fobias',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600/001f3f/ffffff.png',
    dataAiHint: 'overcoming fear',
  },
  {
    title: 'Controle da Dor',
    course: 'Curso de Hipnoterapia',
    image: 'https://placehold.co/400x600/001f3f/ffffff.png',
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
                  <Card className="overflow-hidden border-4 border-[#003366] bg-[#001f3f] text-white shadow-lg transition-transform duration-300 hover:scale-105">
                    <CardContent className="relative flex aspect-[2/3] flex-col items-center justify-center p-6">
                      <Image
                        src={mod.image}
                        alt={mod.title}
                        fill
                        className="object-cover opacity-20"
                        data-ai-hint={mod.dataAiHint}
                      />
                      <div className="z-10 flex flex-col items-center text-center">
                        <span className="mb-4 rounded-full bg-[#003366] px-4 py-1 text-sm font-semibold text-[#FFD700]">
                          MÓDULO
                        </span>
                        <h2 className="text-4xl font-bold uppercase leading-tight tracking-wider text-white">
                          {mod.title}
                        </h2>
                        <div className="mt-8 h-px w-20 bg-[#FFD700]"></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-center justify-center bg-[#003366] p-4 text-center">
                      <h3 className="font-semibold text-white">{mod.course}</h3>
                       <Button className="mt-4 w-full bg-[#FFD700] text-[#003366] hover:bg-yellow-400">
                        Acessar Módulo
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14 text-white hover:text-white bg-[#003366] border-[#FFD700] hover:bg-blue-800" />
          <CarouselNext className="mr-14 text-white hover:text-white bg-[#003366] border-[#FFD700] hover:bg-blue-800" />
        </Carousel>
      </div>
    </div>
  );
}
