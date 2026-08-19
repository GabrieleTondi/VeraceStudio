import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fondazioneverace.eu',
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
