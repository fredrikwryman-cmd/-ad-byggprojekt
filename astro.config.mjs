import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// Sajten ligger på egen domän (ad.aimstudios.se) i domänroten, inte längre i en
// undermapp på github.io. Därför anges ingen `base` alls – Astros standard '/'
// ger renast sökvägar och BASE_URL blir '/', vilket alla länkar/assets ärver.
export default defineConfig({
  site: 'https://ad.aimstudios.se',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
});
