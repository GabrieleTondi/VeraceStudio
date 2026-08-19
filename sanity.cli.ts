import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '83ude8vy',
    dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  },
});
