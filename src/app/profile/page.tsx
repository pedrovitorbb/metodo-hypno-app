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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto max-w-2xl py-12">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
               <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
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
    setError(null);

    try {
      // Re-authenticate if email is being changed
      if (email !== user.email) {
        if (!currentPassword) {
          throw new Error("Por favor, insira sua senha atual para alterar o email.");
        }
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, email);
      }

      // Update display name if changed
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }

      toast({
        title: "Sucesso!",
        description: "Seu perfil foi atualizado.",
        variant: "default",
      });

    } catch (err: any) {
      let message = "Ocorreu um erro ao atualizar o perfil.";
      if (err.code === 'auth/wrong-password') {
        message = "A senha atual está incorreta.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      toast({
        title: "Erro",
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
      <div className="container mx-auto max-w-2xl py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary-foreground">Meu Perfil</CardTitle>
            <CardDescription>Gerencie suas informações pessoais.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2"><User /> Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2"><Mail /> Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   className="bg-background"
                />
              </div>
              {email !== user.email && (
                <div className="space-y-2 rounded-md border border-yellow-300 bg-yellow-50 p-4">
                  <Label htmlFor="currentPassword" className="flex items-center gap-2 font-semibold text-yellow-800"><ShieldCheck /> Senha Atual</Label>
                   <p className="text-sm text-yellow-700">Para sua segurança, confirme sua senha para alterar o email.</p>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Alterações
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
