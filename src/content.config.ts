import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TYPE_KEYS, STACK_KEYS, STEP_KEYS } from './data/site';

const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(TYPE_KEYS),
    origin: z.enum(['official', 'community', 'ours']),
    step: z.enum(STEP_KEYS),
    stacks: z.array(z.enum(STACK_KEYS)).default(['all']),
    summary: z.string(),
    whenToUse: z.string(),
    install: z.object({ powershell: z.string(), bash: z.string() }).optional(),
    run: z.string(),
    source: z.string().url().optional(),
    licence: z.string().optional(),
    related: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    start: z.number().optional(),
    demo: z.string().optional(), // key in src/data/terminals.ts: a drawn terminal session

    lastVerified: z.string(),
    claudeCodeVersion: z.string().default('2.1.x'),
  }),
});

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    minutes: z.number(),
    uses: z.array(z.string()).default([]),
  }),
});

export const collections = { resources, guides };
