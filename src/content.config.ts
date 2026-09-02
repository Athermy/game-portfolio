import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dateRange = z.object({
  startDate: z.string(), // "YYYY-MM"
  endDate: z.string().optional(), // omit if ongoing/work in progress
});

const links = z.object({
  githubUrl: z.string().url().optional(),
  isPrivateRepo: z.boolean().default(false),
  playUrl: z.string().url().optional(), // playable in browser
  downloadUrl: z.string().url().optional(), // downloadable build
});

const media = z.object({
  videoUrl: z.string().optional(),
  gifUrl: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

const gamesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: dateRange.merge(links).merge(media).extend({
    title: z.string(),
    role: z.string(),
    engine: z.string(),
    languages: z.array(z.string()),
    solo: z.boolean().default(true),
    tags: z.array(z.string()), // genre / theme
    shortDescription: z.string(),
    featured: z.boolean().default(false),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: dateRange.merge(links).merge(media).extend({
    title: z.string(),
    role: z.string(),
    stack: z.array(z.string()), // languages / frameworks / tools
    solo: z.boolean().default(true),
    tags: z.array(z.string()),
    shortDescription: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  games: gamesCollection,
  projects: projectsCollection,
};
