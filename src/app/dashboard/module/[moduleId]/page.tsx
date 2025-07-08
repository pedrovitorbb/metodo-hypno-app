import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileText } from 'lucide-react';
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
        <div className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-sm">
            <div className="text-primary">{module.icon}</div>
            <div>
                <h1 className="font-headline text-4xl font-bold">{module.title}</h1>
                <p className="text-lg text-muted-foreground">{module.description}</p>
            </div>
        </div>
      </div>

      <img
        src={module.imageUrl}
        alt={module.title}
        className="w-full h-auto rounded-lg shadow-lg"
      />

      {module.pdfUrl && (
        <div className="mt-8 flex justify-center">
          <Link href={module.pdfUrl} target="_blank" rel="noopener noreferrer" passHref>
            <Button size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Ver Material de Apoio (PDF)
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
