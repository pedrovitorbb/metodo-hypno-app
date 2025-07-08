import { ModuleCard } from '@/components/module-card';
import { BookOpen, Target, Code, FlaskConical, BarChartBig } from 'lucide-react';

// You can customize the module content here
const modules = [
  {
    id: 'module1',
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Módulo 1: Introdução',
    description: 'Comece sua jornada e entenda os conceitos fundamentais.',
  },
  {
    id: 'module2',
    icon: <Target className="h-8 w-8" />,
    title: 'Módulo 2: Estratégias',
    description: 'Aprenda as estratégias mais eficazes para o sucesso.',
  },
  {
    id: 'module3',
    icon: <Code className="h-8 w-8" />,
    title: 'Módulo 3: Implementação',
    description: 'Coloque a mão na massa e implemente o que aprendeu.',
  },
  {
    id: 'module4',
    icon: <FlaskConical className="h-8 w-8" />,
    title: 'Módulo 4: Testes',
    description: 'Valide suas implementações com testes práticos.',
  },
  {
    id: 'module5',
    icon: <BarChartBig className="h-8 w-8" />,
    title: 'Módulo 5: Escala',
    description: 'Descubra como escalar sua solução para mais usuários.',
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
