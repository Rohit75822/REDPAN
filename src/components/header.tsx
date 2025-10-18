'use client';

import { ShoppingCart } from 'lucide-react';
import { RedpanLogo } from '@/components/icons';
import { useCart } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { cartCount } = useCart();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        hasScrolled ? 'bg-background/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-primary">
          <RedpanLogo className="h-8 w-8" />
          <span className="font-headline text-2xl font-bold uppercase tracking-wider text-primary-foreground">
            Redpan
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-muted-foreground transition-colors hover:text-primary-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-primary-foreground" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
