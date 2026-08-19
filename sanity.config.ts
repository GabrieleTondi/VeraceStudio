import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'VERACE Studio',

  projectId: 
    (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_PROJECT_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
    '83ude8vy',
  dataset: 
    (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_DATASET) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) ||
    'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
