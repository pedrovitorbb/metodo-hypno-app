'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Optionally, show an error message to the user
    }
  };

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          Membro Acesso
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-foreground/80 hover:bg-accent hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2 text-foreground/80 hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
        <div className="md:hidden">
            {/* Mobile menu could be implemented here */}
        </div>
      </div>
    </header>
  );
}
