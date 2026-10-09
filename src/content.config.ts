import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Drafts are never built into the public site. The n8n workflow writes new posts
    // with draft: true; you flip it to false (and merge) to publish.
    draft: z.boolean().default(true),
    // Evidence discipline: what kind of article this is and where its facts come from.
    evidence: z.enum(['experiment', 'method', 'analysis']).default('method'),
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          type: z.string(), // e.g. primary source, vendor, editorial, official policy
          checked: z.coerce.date(), // date you opened it and confirmed it supports the claim
        })
      )
      .default([]),
  }),
});

export const collections = { blog };
