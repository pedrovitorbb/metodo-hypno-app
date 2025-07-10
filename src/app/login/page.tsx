'use client';

<<<<<<< HEAD
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
      setError('Por favor, rellena todos los campos.');
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error al iniciar sesión.';
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Correo electrónico o contraseña no válidos.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico no es válido.';
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
    <div className="flex min-h-screen w-full items-center justify-center bg-transparent p-4">
      <Card className="w-full max-w-md shadow-2xl bg-card/50 backdrop-blur-lg border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Accede a tu Cuenta</CardTitle>
          <CardDescription className="text-muted-foreground">
            ¡Bienvenido(a) de vuelta!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Correo Electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 text-base bg-input border-border/50 focus:border-primary"
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 text-base bg-input border-border/50 focus:border-primary"
                disabled={isLoading}
              />
            </div>
             {error && (
              <Alert variant="destructive" className="bg-destructive/20 border-destructive/50 text-destructive-foreground">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="text-right text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-muted-foreground hover:text-accent hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/90 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Entrar'}
            </Button>
          </form>
           <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-bold text-accent hover:underline">
              Crea una ahora
            </Link>
          </div>
        </CardContent>
      </Card>
=======
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmail } from '@/lib/firebase/auth';
import { Loader } from '@/components/ui/loader';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(1, { message: 'Por favor, insira sua senha.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'gbnh@gmail.com',
      password: 'gbn@123',
    },
  });

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { error } = await signInWithEmail(values.email, values.password);
    setLoading(false);

    if (error) {
      toast({
        title: 'Erro de login',
        description: error,
        variant: 'destructive',
      });
    } else {
      router.push('/dashboard');
    }
  };
  
  if (authLoading || user) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader className="h-10 w-10"/></div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background p-4">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:16px_16px]"></div>
       
      <div className="w-full max-w-md rounded-2xl border border-border/20 bg-card/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-primary">Método Hypno</h1>
          <p className="text-muted-foreground">Bem-vindo de volta! Faça login para continuar.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="/forgot-password" passHref>
                <span className="text-sm text-primary hover:underline">Esqueceu a senha?</span>
              </Link>
            </div>
            <Input id="password" type="password" placeholder="********" {...form.register('password')} />
             {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader /> : 'Entrar'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link href="/register" passHref>
            <span className="font-semibold text-primary hover:underline">Registre-se</span>
          </Link>
        </p>
      </div>
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
    </div>
  );
}
