import Link from 'next/link';
import { modules } from '@/lib/modules-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Painel de Controle</h1>
        <p className="text-lg text-muted-foreground">Seu progresso e módulos disponíveis.</p>
      </div>

      <div className="flex justify-center px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl"
        >
          <CarouselContent>
            {modules.map((module) => (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                   <Link href={`/dashboard/module/${module.id}`} className="block group">
                     <img 
                        src={module.imageUrl} 
                        alt={module.title}
                        className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                     />
                  </Link>
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
