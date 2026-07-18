import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(20),
    description: z.string().min(70).max(170),
    publishedAt: z.coerce.date(),
    category: z.string(),
    city: z.string(),
    image: z.string().startsWith('/'),
    imageAlt: z.string().min(20),
    keywords: z.array(z.string()).min(3),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
