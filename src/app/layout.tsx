import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
<<<<<<< HEAD

export const metadata: Metadata = {
  title: 'Acceso Miembros',
  description: 'Área de Miembros Exclusiva',
=======
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'Método Hypno',
  description: 'Your modern members area.',
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="es" className="dark">
      <body>
        {children}
        <Toaster />
=======
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
>>>>>>> 7a652146bb8f77cc6d55e152c78ed887b5ab9862
      </body>
    </html>
  );
}
