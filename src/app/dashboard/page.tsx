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

const modules = [
  {
    imageUrl: 'https://i.imgur.com/85NgJNK.png',
    pdfUrl: 'https://drive.google.com/file/d/1RYuOR2lHkr-PHa3AUtJ-lEdoYFFkE8ZM/view?usp=drive_link',
  },
  {
    imageUrl: 'https://i.imgur.com/xJHXKjI.png',
    pdfUrl: 'https://drive.google.com/file/d/112qJkCaY9TP9YTeNBtf7UWwKqUQgWdQF/view?usp=drive_link',
  },
  {
    imageUrl: 'https://i.imgur.com/JvvCofs.png',
    pdfUrl: 'https://drive.google.com/file/d/1-j_t0cxp9DxzpdPjhm-_nCQi9Ms41-JI/view?usp=drive_link',
  },
  {
    imageUrl: 'https://i.imgur.com/zdWkm8s.png',
    pdfUrl: 'https://drive.google.com/file/d/13g5B5CkNgPrifLsbRVmuFn_Y0I_-oFAD/view?usp=drive_link',
  },
  {
    imageUrl: 'https://i.imgur.com/pMo3NKr.png',
    pdfUrl: 'https://drive.google.com/file/d/1JmrWf1SkoYPQkrQ9FWLNTR6Lx8HG6TDZ/view?usp=drive_link',
  },
  {
    imageUrl: 'https://i.imgur.com/OIBJvzm.png',
    pdfUrl: null,
  },
  {
    imageUrl: 'https://i.imgur.com/zElS168.png',
    pdfUrl: null,
  },
  {
    imageUrl: 'https://i.imgur.com/4w9q4jI.png',
    pdfUrl: null,
  },
  {
    imageUrl: 'https://i.imgur.com/alCDUIE.png',
    pdfUrl: null,
  },
];

const CarouselCard = ({ item, index }: { item: typeof modules[0], index: number }) => {
  const content = (
      <Card className="overflow-hidden border-2 border-primary/20 bg-card shadow-lg transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-primary/40">
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
  );

  if (item.pdfUrl) {
    return (
      <Link href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

export default function DashboardPage() {
  return (
    <div className="w-full bg-background py-12">
      <div className="container mx-auto">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          ¡Bienvenidos!
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
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1 md:p-4">
                    <CarouselCard item={item} index={index} />
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
