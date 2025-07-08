'use client';

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
import { signUpWithEmail } from '@/lib/firebase/auth';
import { Loader } from '@/components/ui/loader';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export default function RegisterPage() {
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
    const { error } = await signUpWithEmail(values.email, values.password);
    setLoading(false);

    if (error) {
      toast({
        title: 'Erro no registro',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Sua conta foi criada. Você será redirecionado.',
      });
      router.push('/dashboard');
    }
  };

  if (authLoading || user) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader className="h-10 w-10"/></div>
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="w-full max-w-md rounded-2xl border border-border/20 bg-card/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-primary">Crie sua Conta</h1>
          <p className="text-muted-foreground">Junte-se à Aurora Academy e comece a aprender.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="********" {...form.register('password')} />
            {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader /> : 'Criar Conta'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login" passHref>
            <span className="font-semibold text-primary hover:underline">Faça login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
