import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import ProductGrid from '@/components/product-grid';
import placeholderImages from '@/lib/placeholder-images.json';
import ContactForm from '@/components/contact-form';
import Testimonials from '@/components/testimonials';

export default async function Home() {
  const products = await getProducts();
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-background');
  const aboutImage = placeholderImages.placeholderImages.find(p => p.id === 'about-image');

  return (
    <>
      <section className="relative flex h-screen w-full items-center justify-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="absolute inset-0 z-0 h-full w-full object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 z-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl text-center text-primary-foreground">
          <h1 className="font-headline text-5xl font-bold uppercase tracking-wider md:text-7xl lg:text-8xl">
            Welcome to Redpan
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Cutting-edge hardware for the modern innovator.
          </p>
          <Button asChild size="lg" className="mt-8 font-bold">
            <a href="#products">Shop Now</a>
          </Button>
        </div>
      </section>

      <section id="products" className="py-16 sm:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-headline text-4xl font-bold uppercase tracking-wider md:text-5xl">
            Our Products
          </h2>
          <ProductGrid products={products} />
        </div>
      </section>
      
      <section id="about" className="bg-card py-16 sm:py-24">
        <div className="container">
           <h2 className="mb-12 text-center font-headline text-4xl font-bold uppercase tracking-wider md:text-5xl">
            About Us
          </h2>
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="font-headline text-3xl font-bold text-foreground">Pioneering the Future of Hardware</h3>
              <p>
                Redpan was born from a passion for innovation and a drive to empower creators, builders, and thinkers. We believe that the right tools can unlock limitless potential. That's why we meticulously source and design high-performance hardware that doesn't just meet expectations—it shatters them.
              </p>
              <p>
                From our state-of-the-art processors to our robust motherboards, every Redpan product is a testament to quality, reliability, and raw power. We're not just selling components; we're providing the building blocks for your next great idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section id="contact" className="py-16 sm:py-24">
        <div className="container max-w-2xl">
          <h2 className="mb-12 text-center font-headline text-4xl font-bold uppercase tracking-wider md:text-5xl">
            Get in Touch
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
