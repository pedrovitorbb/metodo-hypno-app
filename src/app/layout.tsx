import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Acceso Miembros',
  description: 'Área de Miembros Exclusiva',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
