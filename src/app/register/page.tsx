'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Loader2, Mail, Lock, User } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setIsSuccess(true);
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao criar a conta.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso por outra conta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'O formato do email é inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha é muito fraca.';
      } else {
        console.error(error);
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Crie sua Conta</CardTitle>
          <CardDescription>
            Junte-se a nós hoje mesmo!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <AlertTitle className="font-bold text-xl text-foreground">Sucesso!</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Sua conta foi criada. Agora você pode fazer o login.
              </AlertDescription>
              <Button onClick={() => router.push('/login')} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Ir para Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome Completo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 text-base bg-background"
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-base bg-background"
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
                  className="pl-10 text-base bg-background"
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
                className="w-full bg-accent text-accent-foreground text-lg font-semibold hover:bg-accent/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Inscrever-se'}
              </Button>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Já possui uma conta?{' '}
            <Link href="/login" className="font-bold text-primary-foreground hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
