'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      setError('Por favor, insira seu email.');
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSuccess(true);
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao enviar o email.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Nenhuma conta encontrada com este email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'O formato do email é inválido.';
      } else {
        console.error(error);
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
          <CardTitle className="text-3xl font-bold text-foreground">Recuperar Senha</CardTitle>
          <CardDescription className="text-muted-foreground">
            Insira seu email para redefinir sua senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
             <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <AlertTitle className="font-bold text-xl text-foreground">Email Enviado!</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Verifique sua caixa de entrada para as instruções de redefinição.
              </AlertDescription>
              <Link href="/login" className="block mt-4">
                 <Button variant="outline" className="w-full group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/>
                    Voltar para Login
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
                  placeholder="seu@email.com"
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
                {isLoading ? <Loader2 className="animate-spin" /> : 'Enviar Email de Recuperação'}
              </Button>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Lembrou a senha?{' '}
            <Link href="/login" className="font-bold text-accent hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
