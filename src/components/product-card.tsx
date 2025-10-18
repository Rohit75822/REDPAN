'use client';

import type { Product } from '@/types/product';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been successfully added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square relative w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            data-ai-hint={product.imageHint}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <p className="text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
