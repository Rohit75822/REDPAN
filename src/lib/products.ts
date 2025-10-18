import type { Product } from '@/types/product';
import placeholderImages from '@/lib/placeholder-images.json';

const productsData: Omit<Product, 'imageUrl' | 'imageHint'>[] = [
  {
    id: 'product-1',
    name: 'Photon Core X1',
    category: 'CPU',
    description: 'The next generation of processing power. Unleash unparalleled performance for gaming and professional workloads.',
    price: 41500,
  },
  {
    id: 'product-2',
    name: 'Aether-Render GFX',
    category: 'GPU',
    description: 'Experience hyper-realistic visuals and real-time ray tracing with our flagship graphics card.',
    price: 75000,
  },
  {
    id: 'product-3',
    name: 'NexusBoard Z-9000',
    category: 'Motherboard',
    description: 'A rock-solid foundation for your ultimate build, featuring robust power delivery and next-gen connectivity.',
    price: 29000,
  },
  {
    id: 'product-4',
    name: 'Velocity DDR5 Kit',
    category: 'RAM',
    description: '32GB of blazing-fast DDR5 memory, engineered for extreme overclocking and stability.',
    price: 19000,
  },
  {
    id: 'product-5',
    name: 'WarpDrive NVMe SSD',
    category: 'SSD',
    description: '2TB of ultra-fast storage. Say goodbye to loading screens and hello to instant access.',
    price: 16500,
  },
  {
    id: 'product-6',
    name: 'Cryo-Stream Cooler',
    category: 'Cooler',
    description: 'An advanced all-in-one liquid cooling solution to keep your high-end components frosty under pressure.',
    price: 13500,
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

export const getProducts = async (category?: string): Promise<Product[]> => {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (category) {
    return productsWithImages.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return productsWithImages;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return productsWithImages.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export const findProducts = async (query: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lowerCaseQuery = query.toLowerCase();
  return productsWithImages.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
  );
}
