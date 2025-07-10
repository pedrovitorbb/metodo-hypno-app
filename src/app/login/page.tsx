'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao fazer login.';
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Email ou senha inválidos.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O formato do email é inválido.';
          break;
        default:
          console.error(error);
          break;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Card className="w-full max-w-md border-border/40 bg-card/50 shadow-2xl backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Membro Acesso</CardTitle>
          <CardDescription className="text-muted-foreground">
            Faça login para continuar na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 text-base bg-secondary/50 border-border"
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 text-base bg-secondary/50 border-border"
                disabled={isLoading}
              />
            </div>
             {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-primary/80 hover:underline hover:text-primary"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
