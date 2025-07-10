import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, User, LogOut } from 'lucide-react';

export function Header() {
  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/profile', label: 'Perfil', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#003366] shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="text-2xl font-bold text-[#FFD700]">
          Membro Acesso
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-[#FFD700] hover:bg-blue-500/20 hover:text-yellow-300"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/login" passHref>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[#FFD700] hover:bg-blue-500/20 hover:text-yellow-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </nav>
        <div className="md:hidden">
            {/* Mobile menu could be implemented here */}
        </div>
      </div>
    </header>
  );
}
