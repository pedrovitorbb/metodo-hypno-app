import { ModuleCard } from '@/components/module-card';
import {
  DoorOpen,
  PlayCircle,
  Wand,
  ClipboardList,
  Scroll,
  AudioLines,
  FileText,
  BookCopy,
  HelpCircle,
} from 'lucide-react';

const modules = [
  {
    id: 'module1',
    icon: <DoorOpen className="h-8 w-8" />,
    title: 'Boas Vindas',
    description: 'Seja bem-vindo(a)! Tudo o que você precisa saber para começar.',
  },
  {
    id: 'module2',
    icon: <PlayCircle className="h-8 w-8" />,
    title: 'Módulo 1 - Comece Por Aqui',
    description: 'Os primeiros passos para sua jornada de aprendizado.',
  },
  {
    id: 'module3',
    icon: <Wand className="h-8 w-8" />,
    title: 'Módulo 2 - A Técnica',
    description: 'Aprenda a técnica central do método Hypno.',
  },
  {
    id: 'module4',
    icon: <ClipboardList className="h-8 w-8" />,
    title: 'Módulo 3 - O Protocolo',
    description: 'Siga o protocolo passo a passo para aplicar a técnica.',
  },
  {
    id: 'module5',
    icon: <Scroll className="h-8 w-8" />,
    title: 'Bônus - Scripts De Induções Hipnóticas',
    description: 'Scripts prontos para suas sessões de hipnose.',
  },
  {
    id: 'module6',
    icon: <AudioLines className="h-8 w-8" />,
    title: 'Bônus - Sessões De Hipnose Terapêutica',
    description: 'Sessões guiadas para aprofundar sua prática.',
  },
  {
    id: 'module7',
    icon: <FileText className="h-8 w-8" />,
    title: 'Bônus - Scripts De PNL',
    description: 'Explore técnicas de Programação Neurolinguística.',
  },
  {
    id: 'module8',
    icon: <BookCopy className="h-8 w-8" />,
    title: 'Bônus - Materiais De Apoio',
    description: 'Recursos e materiais para complementar seu aprendizado.',
  },
  {
    id: 'module9',
    icon: <HelpCircle className="h-8 w-8" />,
    title: 'Bônus - Sessão Tira Dúvidas',
    description: 'Gravações das sessões ao vivo para tirar dúvidas.',
  },
];


export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Painel de Controle</h1>
        <p className="text-lg text-muted-foreground">Seu progresso e módulos disponíveis.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            moduleId={module.id}
            icon={module.icon}
            title={module.title}
            description={module.description}
          />
        ))}
      </div>
    </div>
  );
}
