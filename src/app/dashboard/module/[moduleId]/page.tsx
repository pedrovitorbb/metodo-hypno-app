import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div className="mt-4">
          <h1 className="font-headline text-4xl font-bold">{module.title}</h1>
        </div>
      </div>

      {module.pdfUrl && (
        <div className="mt-8">
          <iframe
            src={module.pdfUrl}
            className="h-[80vh] w-full rounded-lg border"
            allow="fullscreen"
          ></iframe>
        </div>
      )}
    </div>
  );
}
