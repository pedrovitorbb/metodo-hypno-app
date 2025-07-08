
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
    imageUrl: string;
    pdfUrl?: string;
}

export const modules: Module[] = [
    {
      id: 'module1',
      icon: React.createElement(DoorOpen, { className: "h-8 w-8" }),
      title: 'Módulo 1',
      description: 'Seja bem-vindo(a)! Tudo o que você precisa saber para começar.',
      imageUrl: 'https://i.imgur.com/85NgJNK.png',
      pdfUrl: 'https://drive.google.com/file/d/1RYuOR2lHkr-PHa3AUtJ-lEdoYFFkE8ZM/preview',
    },
    {
      id: 'module2',
      icon: React.createElement(PlayCircle, { className: "h-8 w-8" }),
      title: 'Módulo 2',
      description: 'Os primeiros passos para sua jornada de aprendizado.',
      imageUrl: 'https://i.imgur.com/xJHXKjI.png',
      pdfUrl: 'https://drive.google.com/file/d/112qJkCaY9TP9YTeNBtf7UWwKqUQgWdQF/preview',
    },
    {
      id: 'module3',
      icon: React.createElement(Wand, { className: "h-8 w-8" }),
      title: 'Módulo 3',
      description: 'Aprenda a técnica central do método Hypno.',
      imageUrl: 'https://i.imgur.com/JvvCofs.png',
      pdfUrl: 'https://drive.google.com/file/d/1-j_t0cxp9DxzpdPjhm-_nCQi9Ms41-JI/preview',
    },
    {
      id: 'module4',
      icon: React.createElement(ClipboardList, { className: "h-8 w-8" }),
      title: 'Módulo 4',
      description: 'Siga o protocolo passo a passo para aplicar a técnica.',
      imageUrl: 'https://i.imgur.com/zdWkm8s.png',
      pdfUrl: 'https://drive.google.com/file/d/13g5B5CkNgPrifLsbRVmuFn_Y0I_-oFAD/preview',
    },
    {
      id: 'module5',
      icon: React.createElement(Scroll, { className: "h-8 w-8" }),
      title: 'Módulo 5',
      description: 'Scripts prontos para suas sessões de hipnose.',
      imageUrl: 'https://i.imgur.com/pMo3NKr.png',
      pdfUrl: 'https://drive.google.com/file/d/1JmrWf1SkoYPQkrQ9FWLNTR6Lx8HG6TDZ/preview',
    },
    {
      id: 'module6',
      icon: React.createElement(AudioLines, { className: "h-8 w-8" }),
      title: 'Módulo 6',
      description: 'Sessões guiadas para aprofundar sua prática.',
      imageUrl: 'https://i.imgur.com/OIBJvzm.png',
      pdfUrl: 'https://drive.google.com/file/d/14E6RyFFMZgHcjy6xbVJGXoibQxh0RWIs/preview',
    },
    {
      id: 'module7',
      icon: React.createElement(FileText, { className: "h-8 w-8" }),
      title: 'Módulo 7',
      description: 'Explore técnicas de Programação Neurolinguística.',
      imageUrl: 'https://i.imgur.com/zElS168.png',
      pdfUrl: 'https://drive.google.com/file/d/1AnXbEeWC9dEG5equDSt12lyqxJFrSiyc/preview',
    },
    {
      id: 'module8',
      icon: React.createElement(BookCopy, { className: "h-8 w-8" }),
      title: 'Módulo 8',
      description: 'Recursos e materiais para complementar seu aprendizado.',
      imageUrl: 'https://i.imgur.com/4w9q4jI.png',
      pdfUrl: 'https://drive.google.com/file/d/1DQI91MVMuw0US_dY-jkyIRx-7vfV9z7F/preview',
    },
    {
      id: 'module9',
      icon: React.createElement(HelpCircle, { className: "h-8 w-8" }),
      title: 'Módulo 9',
      description: 'Gravações das sessões ao vivo para tirar dúvidas.',
      imageUrl: 'https://i.imgur.com/alCDUIE.png',
      pdfUrl: 'https://drive.google.com/file/d/15r77W9nTfCjAIbEyo5jf-8EDtTrb4HIA/preview',
    },
];
