import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card text-foreground border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg text-primary-foreground">Membro Acesso</p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-primary-foreground hover:text-accent hover:underline">
              Privacidade
            </Link>
            <Link href="#" className="text-sm text-primary-foreground hover:text-accent hover:underline">
              Termos de Uso
            </Link>
            <Link href="#" className="text-sm text-primary-foreground hover:text-accent hover:underline">
              Contato
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href="#" passHref>
              <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:bg-primary/20 hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#" passHref>
              <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:bg-primary/20 hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#" passHref>
              <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:bg-primary/20 hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
