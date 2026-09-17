// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { INDEXABLE } from './site.config.mjs';

/**
 * Cloudflare reads `_headers` from the build output. Writing it here rather
 * than keeping a static copy means the noindex switch lives in exactly one
 * place. The header is a belt-and-braces backstop to the meta tag: it also
 * covers the PDF and the images, which have no HTML to put a meta tag in.
 */
const robotsHeader = {
  name: 'bnc-robots-header',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (INDEXABLE) return;
      await writeFile(
        new URL('_headers', dir),
        '/*\n  X-Robots-Tag: noindex, nofollow\n',
        'utf8',
      );
    },
  },
};

// Update `site` to the production domain before the first Cloudflare deploy.
// It drives canonical URLs, Open Graph URLs and sitemap.xml.
export default defineConfig({
  site: 'https://www.bachataandcubanweekend.com',
  output: 'static',
  trailingSlash: 'never',
  // No sitemap while the site is not indexable — no point advertising URLs
  // we are actively asking search engines to leave alone.
  integrations: [INDEXABLE && sitemap(), robotsHeader],
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
