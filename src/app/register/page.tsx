'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#003366]">Crie sua Conta</CardTitle>
          <CardDescription>
            Junte-se a nós hoje mesmo!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <Alert className="border-2 border-yellow-400 bg-yellow-50 text-yellow-800">
              <CheckCircle2 className="h-4 w-4 !text-yellow-600" />
              <AlertTitle className="font-bold">Sucesso!</AlertTitle>
              <AlertDescription>
                Sua conta foi criada. Agora você pode fazer o login.
              </AlertDescription>
              <Link href="/login" className="block text-center mt-4">
                <Button className="bg-[#003366] text-white hover:bg-blue-800 w-full">Ir para Login</Button>
              </Link>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome Completo"
                  required
                  className="border-2 border-blue-500 bg-[#F1F1F1] focus:bg-white"
                />
              </div>
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                   className="border-2 border-blue-500 bg-[#F1F1F1] focus:bg-white"
                />
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  required
                   className="border-2 border-blue-500 bg-[#F1F1F1] focus:bg-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#003366] text-white text-lg font-semibold hover:bg-blue-800 transition-colors duration-300"
              >
                Inscrever-se
              </Button>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-gray-600">
            Já possui uma conta?{' '}
            <Link href="/login" className="font-bold text-[#003366] hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
