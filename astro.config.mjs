import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  base: '/-ad-byggprojekt/',
  site: 'https://fredrikwryman-cmd.github.io',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
});
