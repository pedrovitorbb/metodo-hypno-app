'use client';

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
import { Label } from '@/components/ui/label';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#003366] p-4">
      <Card className="w-full max-w-md border-4 border-[#FFD700] bg-white text-gray-800 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#003366]">Membro Acesso</CardTitle>
          <CardDescription className="text-gray-600">
            Faça login para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                className="pl-10 text-base"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                required
                className="pl-10 text-base"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FFD700] text-[#003366] text-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link
              href="#"
              className="font-medium text-[#FFD700] hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
