'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordReset } from '@/lib/firebase/auth';
import { Loader } from '@/components/ui/loader';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { error } = await sendPasswordReset(values.email);
    setLoading(false);

    if (error) {
      toast({
        title: 'Erro',
        description: error,
        variant: 'destructive',
      });
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="w-full max-w-md rounded-2xl border border-border/20 bg-card/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-primary">Recuperar Senha</h1>
          <p className="text-muted-foreground">
            {submitted ? 'Verifique sua caixa de entrada.' : 'Insira seu e-mail para receber um link de redefinição.'}
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 text-center">
            <p>Se uma conta com este e-mail existir, um link de redefinição foi enviado.</p>
            <Link href="/login" passHref>
                <Button variant="link" className="mt-4 text-primary">Voltar para o Login</Button>
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" {...form.register('email')} />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader /> : 'Enviar Link'}
              </Button>
            </form>
             <p className="mt-8 text-center text-sm text-muted-foreground">
                Lembrou a senha?{' '}
                <Link href="/login" passHref>
                    <span className="font-semibold text-primary hover:underline">Faça login</span>
                </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
