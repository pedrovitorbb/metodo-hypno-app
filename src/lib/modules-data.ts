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
import type { ReactNode } from 'react';

export interface Module {
    id: string;
    icon: ReactNode;
    title: string;
    description: string;
}

export const modules: Module[] = [
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
