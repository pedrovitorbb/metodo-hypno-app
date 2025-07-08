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
      pdfUrl: 'https://www.dropbox.com/scl/fi/elntlydmuzwzemdochyr5/Descubriendo-el-Poder-de-la-Hipnoterapia-Infantil.pdf?rlkey=fw4m0nxopz3rzlyl32g7z19p4&raw=1',
    },
    {
      id: 'module2',
      icon: React.createElement(PlayCircle, { className: "h-8 w-8" }),
      title: 'Módulo 2',
      description: 'Os primeiros passos para sua jornada de aprendizado.',
      imageUrl: 'https://i.imgur.com/xJHXKjI.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/8so6jjfpraemp71yar0a5/Hipnoterapia-Infantil-en-la-Practica.pdf?rlkey=4se0w4rljb9vgevk4cizeo344&raw=1',
    },
    {
      id: 'module3',
      icon: React.createElement(Wand, { className: "h-8 w-8" }),
      title: 'Módulo 3',
      description: 'Aprenda a técnica central do método Hypno.',
      imageUrl: 'https://i.imgur.com/JvvCofs.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/as7atscnpi62c9inlae3b/Hipnoterapia-Infantil-SleepTalkr-Una-Tecnica-Revolucionaria-para-Padres-Conscientes.pdf?rlkey=l8d8hlpd3iroew77iprz7ppqf&raw=1',
    },
    {
      id: 'module4',
      icon: React.createElement(ClipboardList, { className: "h-8 w-8" }),
      title: 'Módulo 4',
      description: 'Siga o protocolo passo a passo para aplicar a técnica.',
      imageUrl: 'https://i.imgur.com/zdWkm8s.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/rodgh8iriewh7pfvml5c8/Hipnoterapia-Infantil-Casos-Reales-que-Transforman-Vidas.pdf?rlkey=hv49vfcn6xyubse6ov8w6d33q&raw=1',
    },
    {
      id: 'module5',
      icon: React.createElement(Scroll, { className: "h-8 w-8" }),
      title: 'Módulo 5',
      description: 'Scripts prontos para suas sessões de hipnose.',
      imageUrl: 'https://i.imgur.com/pMo3NKr.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/qd7pzfzokjunxy9cuuttc/Desconectados-Estrategias-para-Reducir-el-Uso-Excesivo-del-Celular-en-Ninos.pdf?rlkey=tbxlptky3pmajwubly08bxnkv&raw=1',
    },
    {
      id: 'module6',
      icon: React.createElement(AudioLines, { className: "h-8 w-8" }),
      title: 'Módulo 6',
      description: 'Sessões guiadas para aprofundar sua prática.',
      imageUrl: 'https://i.imgur.com/OIBJvzm.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/rsc3udyjjtkpyehoa1gsk/Acompanando-el-Duelo-Infantil.pdf?rlkey=w0rdmfb2jx68l7ikhrd0dpoiu&raw=1',
    },
    {
      id: 'module7',
      icon: React.createElement(FileText, { className: "h-8 w-8" }),
      title: 'Módulo 7',
      description: 'Explore técnicas de Programação Neurolinguística.',
      imageUrl: 'https://i.imgur.com/zElS168.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/dtr4z0oponjhitctt2y1y/Tics-Infantiles-Comprendiendo-y-Apoyando-a-Tu-Hijo.pdf?rlkey=d19m8tftzwpuwjb8xdtpialtp&raw=1',
    },
    {
      id: 'module8',
      icon: React.createElement(BookCopy, { className: "h-8 w-8" }),
      title: 'Módulo 8',
      description: 'Recursos e materiais para complementar seu aprendizado.',
      imageUrl: 'https://i.imgur.com/4w9q4jI.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/dm9duyg9j6gwrpjs27aju/Comprendiendo-y-Apoyando-la-Tartamudez-Infantil.pdf?rlkey=ct2naum469kepz5d6njiebxfq&raw=1',
    },
    {
      id: 'module9',
      icon: React.createElement(HelpCircle, { className: "h-8 w-8" }),
      title: 'Módulo 9',
      description: 'Gravações das sessões ao vivo para tirar dúvidas.',
      imageUrl: 'https://i.imgur.com/alCDUIE.png',
      pdfUrl: 'https://www.dropbox.com/scl/fi/odj2gwt7hfomz097zg4cf/Problemas-Alimentarios-Infantiles-Guia-para-Padres-y-Cuidadores.pdf?rlkey=8qlw9hdft7ztj7cig0z84e7wv&raw=1',
    },
];
