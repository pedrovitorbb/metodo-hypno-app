'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LogOut, UserCircle } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const navItems = [
    { href: '/dashboard', label: 'Painel', icon: Home },
    { href: '/profile', label: 'Perfil', icon: UserCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/dashboard" className="text-2xl font-bold text-foreground">
          Membro<span className="text-primary">Acesso</span>
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 text-lg hover:bg-muted",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2 text-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </nav>
        <div className="md:hidden">
            {/* Mobile menu could be implemented here */}
        </div>
      </div>
    </header>
  );
}
