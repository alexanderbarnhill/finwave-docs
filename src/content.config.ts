import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Extend the docs frontmatter with our quickRef bullets — surfaced both on the
// rendered docs page (via the QuickRef component override) and consumed by the
// Hub's in-app help drawer through dist/help-manifest.json.
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				quickRef: z.array(z.string()).max(10).optional(),
			}),
		}),
	}),
};
