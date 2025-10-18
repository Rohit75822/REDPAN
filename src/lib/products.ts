import type { Product } from '@/types/product';
import placeholderImages from '@/lib/placeholder-images.json';

const productsData: Omit<Product, 'imageUrl' | 'imageHint'>[] = [
  {
    id: 'product-1',
    name: 'Photon Core X1',
    description: 'The next generation of processing power. Unleash unparalleled performance for gaming and professional workloads.',
    price: 499.99,
  },
  {
    id: 'product-2',
    name: 'Aether-Render GFX',
    description: 'Experience hyper-realistic visuals and real-time ray tracing with our flagship graphics card.',
    price: 899.99,
  },
  {
    id: 'product-3',
    name: 'NexusBoard Z-9000',
    description: 'A rock-solid foundation for your ultimate build, featuring robust power delivery and next-gen connectivity.',
    price: 349.99,
  },
  {
    id: 'product-4',
    name: 'Velocity DDR5 Kit',
    description: '32GB of blazing-fast DDR5 memory, engineered for extreme overclocking and stability.',
    price: 229.99,
  },
  {
    id: 'product-5',
    name: 'WarpDrive NVMe SSD',
    description: '2TB of ultra-fast storage. Say goodbye to loading screens and hello to instant access.',
    price: 199.99,
  },
  {
    id: 'product-6',
    name: 'Cryo-Stream Cooler',
    description: 'An advanced all-in-one liquid cooling solution to keep your high-end components frosty under pressure.',
    price: 159.99,
  },
];

const allImages = placeholderImages.placeholderImages;

const productsWithImages: Product[] = productsData.map((product) => {
  const image = allImages.find((img) => img.id === product.id);
  return {
    ...product,
    imageUrl: image?.imageUrl || 'https://picsum.photos/seed/error/400/400',
    imageHint: image?.imageHint || 'hardware'
  };
});

export const getProducts = async (): Promise<Product[]> => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 500));
  return productsWithImages;
};
