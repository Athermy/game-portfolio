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
  logo: z.string().optional(), // small circular logo shown at the top of the game page
  videoUrl: z.string().optional(), // local video file
  trailerUrl: z.string().url().optional(), // embeddable trailer (e.g. YouTube)
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
    status: z.enum(['done', 'ongoing']).default('done'),
    updatesPlanned: z.boolean().default(false), // only relevant if status is "done"
    tools: z.array(z.string()).default([]), // software used: Unity, Photoshop, Maya, Blender, FMOD, etc.
    skills: z.array(z.string()).default([]), // what you personally did: Programming, UI, 3D, Animation, Music, etc.
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
    status: z.enum(['done', 'ongoing']).default('done'),
    featured: z.boolean().default(false),
  }),
});

// Devlogs: one entry per numbered update, linked back to a game by its `game` id.
const devlogsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devlogs' }),
  schema: z.object({
    game: z.string(), // id of the game this devlog belongs to (matches the games/*.md filename)
    number: z.number().int(), // display order, e.g. #1, #2...
    title: z.string(),
    date: z.string(), // "YYYY-MM-DD"
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  games: gamesCollection,
  projects: projectsCollection,
  devlogs: devlogsCollection,
};
