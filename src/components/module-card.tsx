'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  moduleId: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export function ModuleCard({
  moduleId,
  icon,
  title,
  description,
}: ModuleCardProps) {
  return (
    <Link
      href={`/dashboard/module/${moduleId}`}
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-col border-border transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <CardTitle className="font-headline text-lg font-medium">
            {title}
          </CardTitle>
          <div className="pt-1 text-primary">{icon}</div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Entrar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
