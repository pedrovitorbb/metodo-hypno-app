'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Target, Code, TestTube2, Scaling } from 'lucide-react';
import React from 'react';

const modules = [
  {
    title: 'Módulo 1: Introdução',
    description: 'Conceitos fundamentais e visão geral do curso.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Módulo 2: Estratégias',
    description: 'Aprenda as melhores estratégias para o sucesso.',
    icon: <Target className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Módulo 3: Implementação',
    description: 'Coloque em prática o que aprendeu.',
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Módulo 4: Testes',
    description: 'Valide e otimize suas implementações.',
    icon: <TestTube2 className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Módulo 5: Escala',
    description: 'Estratégias para escalar seu projeto.',
    icon: <Scaling className="h-8 w-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="w-full bg-background py-12">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold text-foreground">
          Módulos do Curso
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((mod, index) => (
              <Card 
                key={index} 
                className="bg-secondary/50 border-border/60 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-primary/60"
              >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {mod.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{mod.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{mod.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
