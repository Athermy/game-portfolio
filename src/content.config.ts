import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.string(), // e.g., "Gameplay Programmer"
    engine: z.string(), // e.g., "Unity / C#"
    gifUrl: z.string(), // GIF or screenshot link
    githubUrl: z.string().optional(), // Public GitHub repo URL
    isPrivateRepo: z.boolean().default(false), // Flag for private code
  }),
});

export const collections = { projects };