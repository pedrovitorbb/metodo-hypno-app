'use client';

import { useState } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email) {
      setError('Por favor, ingrese su correo electrónico.');
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSuccess(true);
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error al enviar el correo electrónico.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No se encontró ninguna cuenta con este correo electrónico.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El formato del correo electrónico es inválido.';
      } else {
        console.error(error);
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
=======
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
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen w-full items-center justify-center bg-transparent p-4">
      <Card className="w-full max-w-md shadow-2xl bg-card/50 backdrop-blur-lg border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Recuperar Contraseña</CardTitle>
          <CardDescription className="text-muted-foreground">
            Ingrese su correo para restablecer su contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
             <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <AlertTitle className="font-bold text-xl text-foreground">¡Correo Enviado!</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Revise su bandeja de entrada para las instrucciones de restablecimiento.
              </AlertDescription>
              <Link href="/login" className="block mt-4">
                 <Button variant="outline" className="w-full group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/>
                    Volver a Iniciar Sesión
                 </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="su@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-base bg-input border-border/50 focus:border-primary"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <Alert variant="destructive" className="bg-destructive/20 border-destructive/50 text-destructive-foreground">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground text-lg font-semibold hover:bg-accent/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Enviar Correo de Recuperación'}
              </Button>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿Recordaste la contraseña?{' '}
            <Link href="/login" className="font-bold text-accent hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
=======
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
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
    </div>
  );
}
