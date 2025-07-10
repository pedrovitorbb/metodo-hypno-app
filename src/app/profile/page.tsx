'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User, Mail, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '../dashboard/layout';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-grow items-center justify-center">
            <div className="w-full max-w-2xl">
                <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-8 pt-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-36" />
                    </CardContent>
                </Card>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tasks = [];
      let reauthenticated = false;

      // Re-authenticate if email is being changed
      if (email !== user.email) {
        if (!currentPassword) {
            toast({
                title: "Senha necessária",
                description: "Por favor, insira sua senha atual para alterar o email.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        reauthenticated = true;
        tasks.push(updateEmail(user, email));
      }

      // Update display name if changed
      if (name !== user.displayName) {
        tasks.push(updateProfile(user, { displayName: name }));
      }
      
      if (tasks.length === 0) {
         toast({
            title: "Nenhuma alteração",
            description: "Você não modificou nenhum campo.",
        });
        setIsSubmitting(false);
        return
      }

      await Promise.all(tasks);

      toast({
        title: "Sucesso!",
        description: "Seu perfil foi atualizado.",
      });

    } catch (err: any) {
      let message = "Ocorreu um erro ao atualizar o perfil.";
      if (err.code === 'auth/wrong-password') {
        message = "A senha atual está incorreta.";
      } else if (err.code === 'auth/email-already-in-use') {
        message = "Este email já está em uso por outra conta."
      } else if (err.message) {
        message = err.message;
      }
      toast({
        title: "Erro ao atualizar",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setCurrentPassword('');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-grow items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl bg-card/50 backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">Meu Perfil</CardTitle>
            <CardDescription className="text-muted-foreground">Gerencie suas informações pessoais e de acesso.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-base"><User /> Nome de Exibição</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-base"><Mail /> Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   className="bg-input border-border/50 focus:border-primary"
                />
              </div>
              {email !== user.email && (
                <div className="space-y-3 rounded-md border border-accent/30 bg-accent/10 p-4">
                  <Label htmlFor="currentPassword" className="flex items-center gap-2 font-semibold text-accent"><ShieldCheck /> Senha Atual</Label>
                   <p className="text-sm text-accent/80">Para sua segurança, confirme sua senha para alterar o email.</p>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Sua senha atual"
                    className="bg-input border-border/50 focus:border-accent"
                  />
                </div>
              )}
              <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar Alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
