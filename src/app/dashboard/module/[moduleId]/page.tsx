import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { modules } from '@/lib/modules-data';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId);

  if (!module) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>
        <div className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-sm">
            <div className="text-primary">{module.icon}</div>
            <div>
                <h1 className="font-headline text-4xl font-bold">{module.title}</h1>
                <p className="text-lg text-muted-foreground">{module.description}</p>
            </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Módulo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Aqui você encontrará vídeos, textos e materiais de apoio para este módulo.</p>
          <p>O conteúdo para <strong className="text-foreground">{module.title}</strong> será adicionado em breve.</p>
          
          <div className="aspect-video my-6">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
          </div>

          <p>Fique atento para as atualizações!</p>
        </CardContent>
      </Card>
    </div>
  );
}
