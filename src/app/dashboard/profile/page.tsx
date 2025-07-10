'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
       <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary">Carregando perfil...</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto bg-secondary/50 border-border/60">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Seu Perfil</CardTitle>
                <CardDescription>Aqui você pode ver suas informações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Email</span>
                    <p className="text-lg text-foreground">{user?.email || 'Não disponível'}</p>
                </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Nome</span>
                    <p className="text-lg text-foreground">{user?.displayName || 'Não definido'}</p>
                </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">UID do Usuário</span>
                    <p className="text-lg font-mono text-xs text-muted-foreground">{user?.uid || 'Não disponível'}</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
