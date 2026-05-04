// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.finwave.io',
  integrations: [
    starlight({
      title: 'finwave Docs',
      logo: { src: './src/assets/finwave-logo.svg' },
      customCss: ['./src/styles/custom.css'],
      editLink: { baseUrl: 'https://github.com/finwave/finwave-docs/edit/main/' },
      // Override PageTitle so a quickRef callout renders below the page heading
      // when the frontmatter defines one. Same bullets the Hub help drawer
      // consumes from dist/help-manifest.json.
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      sidebar: [
        {
          label: 'Onboarding',
          autogenerate: { directory: 'onboarding' },
        },
        {
          label: 'Web Application',
          items: [
            {
              label: 'Getting Started',
              autogenerate: { directory: 'web/getting-started' },
            },
            {
              label: 'Core Concepts',
              autogenerate: { directory: 'web/core-concepts' },
            },
            {
              label: 'Features',
              items: [
                {
                  label: 'Encounters',
                  autogenerate: { directory: 'web/features/encounters' },
                },
                {
                  label: 'Individuals',
                  autogenerate: { directory: 'web/features/individuals' },
                },
                {
                  label: 'Annotator',
                  autogenerate: { directory: 'web/features/annotator' },
                },
                { label: 'Submissions', slug: 'web/features/submissions' },
                { label: 'Comments', slug: 'web/features/comments' },
                { label: 'Confirmation Queue', slug: 'web/features/confirmation-queue' },
              ],
            },
            {
              label: 'Workbench',
              items: [
                { label: 'Overview', slug: 'web/workbench/overview' },
                {
                  label: 'Catalog Builder',
                  autogenerate: { directory: 'web/workbench/catalog-builder' },
                  collapsed: true,
                },
                { label: 'Review Queue', slug: 'web/workbench/review-queue' },
                {
                  label: 'Analyses',
                  autogenerate: { directory: 'web/workbench/analyses' },
                },
              ],
            },
            {
              label: 'ML Center',
              autogenerate: { directory: 'web/ml-center' },
            },
            {
              label: 'Administration',
              autogenerate: { directory: 'web/administration' },
            },
            {
              label: 'Troubleshooting',
              autogenerate: { directory: 'web/troubleshooting' },
            },
          ],
        },
        {
          label: 'Desktop Client',
          items: [
            {
              label: 'Getting Started',
              autogenerate: { directory: 'desktop/getting-started' },
            },
            {
              label: 'Discovery & Manifesting',
              autogenerate: { directory: 'desktop/discovery' },
            },
            {
              label: 'Onboarding',
              autogenerate: { directory: 'desktop/onboarding' },
            },
            {
              label: 'Synchronization',
              autogenerate: { directory: 'desktop/sync' },
            },
            {
              label: 'IT & Security',
              autogenerate: { directory: 'desktop/it-security' },
            },
          ],
        },
        {
          label: 'Release Notes',
          autogenerate: { directory: 'release-notes' },
        },
      ],
    }),
  ],
});
