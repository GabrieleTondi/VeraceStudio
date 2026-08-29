import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://fondazioneverace.eu',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        'astro/jsx-dev-runtime': 'astro/jsx-runtime',
      },
    },
  },
});
