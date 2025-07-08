import { ModuleCard } from '@/components/module-card';
import { modules } from '@/lib/modules-data';

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
