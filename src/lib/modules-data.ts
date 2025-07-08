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
      title: '¡Bienvenidos!',
      description: 'Seja bem-vindo(a)! Tudo o que você precisa saber para começar.',
      imageUrl: 'https://i.imgur.com/85NgJNK.png',
      pdfUrl: '',
    },
    {
      id: 'module2',
      icon: React.createElement(PlayCircle, { className: "h-8 w-8" }),
      title: 'introducción',
      description: 'Os primeiros passos para sua jornada de aprendizado.',
      imageUrl: 'https://i.imgur.com/xJHXKjI.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/elntlydmuzwzemdochyr5/Descubriendo-el-Poder-de-la-Hipnoterapia-Infantil.pdf?rlkey=fw4m0nxopz3rzlyl32g7z19p4&st=lv7dqx1f&dl=1',
    },
    {
      id: 'module3',
      icon: React.createElement(Wand, { className: "h-8 w-8" }),
      title: 'técnicas',
      description: 'Aprenda a técnica central do método Hypno.',
      imageUrl: 'https://i.imgur.com/JvvCofs.png',
      pdfUrl: '',
    },
    {
      id: 'module4',
      icon: React.createElement(ClipboardList, { className: "h-8 w-8" }),
      title: 'Casos reales',
      description: 'Siga o protocolo passo a passo para aplicar a técnica.',
      imageUrl: 'https://i.imgur.com/zdWkm8s.png',
      pdfUrl: '',
    },
    {
      id: 'module5',
      icon: React.createElement(Scroll, { className: "h-8 w-8" }),
      title: 'Reduciendo el uso excesivo del celular',
      description: 'Scripts prontos para suas sessões de hipnose.',
      imageUrl: 'https://i.imgur.com/pMo3NKr.png',
      pdfUrl: '',
    },
    {
      id: 'module6',
      icon: React.createElement(AudioLines, { className: "h-8 w-8" }),
      title: 'Luto infantil',
      description: 'Sessões guiadas para aprofundar sua prática.',
      imageUrl: 'https://i.imgur.com/OIBJvzm.png',
      pdfUrl: '',
    },
    {
      id: 'module7',
      icon: React.createElement(FileText, { className: "h-8 w-8" }),
      title: 'Tic infantil',
      description: 'Explore técnicas de Programação Neurolinguística.',
      imageUrl: 'https://i.imgur.com/zElS168.png',
      pdfUrl: '',
    },
    {
      id: 'module8',
      icon: React.createElement(BookCopy, { className: "h-8 w-8" }),
      title: 'tartamudez',
      description: 'Recursos e materiais para complementar seu aprendizado.',
      imageUrl: 'https://i.imgur.com/4w9q4jI.png',
      pdfUrl: '',
    },
    {
      id: 'module9',
      icon: React.createElement(HelpCircle, { className: "h-8 w-8" }),
      title: 'problemas alimenticios',
      description: 'Gravações das sessões ao vivo para tirar dúvidas.',
      imageUrl: 'https://i.imgur.com/alCDUIE.png',
      pdfUrl: '',
    },
];
