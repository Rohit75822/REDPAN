import { Github, Linkedin, Twitter } from 'lucide-react';
import { RedpanLogo } from './icons';

export default function Footer() {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 text-primary">
            <RedpanLogo className="h-6 w-6" />
            <span className="font-headline text-xl font-bold uppercase tracking-wider text-foreground">
              Redpan
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Redpan. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80">
              website build by 11 verse
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
