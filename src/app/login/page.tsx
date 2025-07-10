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
import { Facebook, Mail, Lock } from 'lucide-react';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.42,44,30.631,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#3A8DFF] p-4">
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
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-xs text-gray-500">
              OU CONECTE-SE COM
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-yellow-50 hover:text-yellow-600">
              <Facebook className="mr-2 h-5 w-5" />
              Facebook
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-bold text-[#003366] hover:underline">
              Inscreva-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
