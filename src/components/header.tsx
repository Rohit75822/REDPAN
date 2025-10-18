'use client';

import { Menu, ShoppingCart } from 'lucide-react';
import { RedpanLogo } from '@/components/icons';
import { useCart } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navLinks = [
  { name: 'Home', href: '#', mobileOnly: true },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { cartCount } = useCart();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY && currentScrollY > 80) { // scrolling down
        setHeaderVisible(false);
      } else { // scrolling up
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        headerVisible ? 'translate-y-0' : '-translate-y-full',
        isScrolled ? 'bg-background/80 shadow-lg backdrop-blur-sm' : 'bg-background'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-primary">
          <RedpanLogo className="h-8 w-8" />
          <span className={cn(
              "font-headline text-2xl font-bold uppercase tracking-wider text-primary"
            )}>
            Redpan
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.filter(l => !l.mobileOnly).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium transition-colors text-foreground"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className={cn("h-6 w-6 text-foreground")} />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className={cn("h-6 w-6 text-foreground")} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-8 pt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
