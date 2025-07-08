import React from 'react';
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
      icon: React.createElement(DoorOpen, { className: "h-8 w-8" }),
      title: '¡Bienvenidos!',
      description: 'Seja bem-vindo(a)! Tudo o que você precisa saber para começar.',
    },
    {
      id: 'module2',
      icon: React.createElement(PlayCircle, { className: "h-8 w-8" }),
      title: 'introducción',
      description: 'Os primeiros passos para sua jornada de aprendizado.',
    },
    {
      id: 'module3',
      icon: React.createElement(Wand, { className: "h-8 w-8" }),
      title: 'técnicas',
      description: 'Aprenda a técnica central do método Hypno.',
    },
    {
      id: 'module4',
      icon: React.createElement(ClipboardList, { className: "h-8 w-8" }),
      title: 'Casos reales',
      description: 'Siga o protocolo passo a passo para aplicar a técnica.',
    },
    {
      id: 'module5',
      icon: React.createElement(Scroll, { className: "h-8 w-8" }),
      title: 'Reduciendo el uso excesivo del celular',
      description: 'Scripts prontos para suas sessões de hipnose.',
    },
    {
      id: 'module6',
      icon: React.createElement(AudioLines, { className: "h-8 w-8" }),
      title: 'Luto infantil',
      description: 'Sessões guiadas para aprofundar sua prática.',
    },
    {
      id: 'module7',
      icon: React.createElement(FileText, { className: "h-8 w-8" }),
      title: 'Tic infantil',
      description: 'Explore técnicas de Programação Neurolinguística.',
    },
    {
      id: 'module8',
      icon: React.createElement(BookCopy, { className: "h-8 w-8" }),
      title: 'tartamudez',
      description: 'Recursos e materiais para complementar seu aprendizado.',
    },
    {
      id: 'module9',
      icon: React.createElement(HelpCircle, { className: "h-8 w-8" }),
      title: 'problemas alimenticios',
      description: 'Gravações das sessões ao vivo para tirar dúvidas.',
    },
];
