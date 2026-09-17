// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Update `site` to the production domain before the first Cloudflare deploy.
// It drives canonical URLs, Open Graph URLs and sitemap.xml.
export default defineConfig({
  site: 'https://www.bachataandcubanweekend.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  // Self-hosted, build-time optimised fonts: no render-blocking request to
  // Google, preloaded woff2 subsets, and generated fallback metrics (no CLS).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo Black',
      cssVariable: '--font-display',
      weights: [400],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Impact', 'Haettenschweiler', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-body',
      weights: ['300 800'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],
});
