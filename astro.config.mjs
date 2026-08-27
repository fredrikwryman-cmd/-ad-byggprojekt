import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// Sajten ligger på egen domän (ad.aimstudios.se) i domänroten, inte längre i en
// undermapp på github.io. Därför är base '/' – BASE_URL blir '/' och alla
// interna länkar och tillgångar som utgår från den pekar direkt på roten.
export default defineConfig({
  base: '/',
  site: 'https://ad.aimstudios.se',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
});
