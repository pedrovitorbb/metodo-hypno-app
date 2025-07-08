'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { getUserProgress, updateUserProgress } from '@/lib/firebase/firestore';
import { CheckCircle2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface ModuleCardProps {
  moduleId: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export function ModuleCard({ moduleId, icon, title, description }: ModuleCardProps) {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        setLoading(true);
        const progress = await getUserProgress(user.uid);
        setIsCompleted(!!progress[moduleId]);
        setLoading(false);
      };
      fetchProgress();
    }
  }, [user, moduleId]);

  const handleToggleComplete = async (checked: boolean) => {
    if (user) {
      setIsCompleted(checked);
      await updateUserProgress(user.uid, moduleId, checked);
    }
  };

  return (
    <Link href={`/dashboard/module/${moduleId}`} className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 ${isCompleted ? 'border-green-500/50 bg-card/90' : 'border-border'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium font-headline">{title}</CardTitle>
          <div className="text-primary">{icon}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div
            className="mt-4 flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {loading ? (
              <Skeleton className="h-6 w-24 rounded-md" />
            ) : (
              <>
                <Switch
                  id={`module-${moduleId}`}
                  checked={isCompleted}
                  onCheckedChange={handleToggleComplete}
                  aria-label={`Mark ${title} as complete`}
                />
                <Label htmlFor={`module-${moduleId}`} className="flex cursor-pointer items-center gap-2">
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Concluído
                    </>
                  ) : (
                    'Marcar como concluído'
                  )}
                </Label>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
