'use server';

import {ai} from '@/ai/genkit';
import {findProducts, getProductsByCategory} from '@/lib/products';
import {z} from 'zod';

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  imageHint: z.string(),
});

const hardwareChatTool = ai.defineTool(
  {
    name: 'hardwareChat',
    description:
      'Use this tool to answer user questions about computer hardware. You can search for products, filter by category, and provide details. All prices are in Indian Rupees (₹).',
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          'The user\'s request, e.g., "Find me a GPU" or "best gaming CPU"'
        ),
      category: z
        .string()
        .optional()
        .describe(
          'Filter products by category (e.g., CPU, GPU, RAM, Motherboard, SSD, Cooler)'
        ),
    }),
    outputSchema: z.array(productSchema),
  },
  async (input) => {
    if (input.category) {
      return getProductsByCategory(input.category);
    }
    return findProducts(input.query);
  }
);

const hardwareChatFlow = ai.defineFlow(
  {
    name: 'hardwareChatFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: `You are an expert AI assistant for the "Redpan" hardware store. Your goal is to help users find the best hardware components for their needs.
      - Answer questions about product details, compatibility, and pricing.
      - All prices are in Indian Rupees (₹).
      - The user is looking for components in the ₹20,000–₹50,000 price range, unless they specify otherwise.
      - Be friendly, helpful, and concise.
      - When providing product suggestions, list the product name and price.
      - Do not make up products or prices. Use the tool to find real products.

      User question: ${prompt}`,
      tools: [hardwareChatTool],
      model: 'googleai/gemini-pro',
    });

    return llmResponse.text();
  }
);

export async function hardwareChat(prompt: string): Promise<string> {
  const result = await hardwareChatFlow(prompt);
  return result;
}
