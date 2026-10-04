// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL is set on Render to https://samodus.com (the live domain).

const site = process.env.SITE_URL || 'https://samodus.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/privacy') && !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  image: { domains: [] },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
