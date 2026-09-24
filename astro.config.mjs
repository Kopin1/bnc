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

// Production domain, without www — Cloudflare redirects www to it.
// It drives canonical URLs, Open Graph URLs and sitemap.xml.
export default defineConfig({
  site: 'https://bachataandcubanweekend.com',
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
      // Client-supplied, self-hosted. Provenance and the licence note are in
      // src/assets/fonts/README.md.
      //
      // Bold (700) only: nothing on the site renders at 900, and a preloaded
      // weight that never paints is pure cost. The Black files are kept in
      // src/assets/fonts if more heading weight is ever wanted — it measures
      // just 3% wider than Bold, so it drops in without reflowing anything.
      provider: fontProviders.local(),
      name: 'Myriad Pro',
      cssVariable: '--font-display',
      options: {
        variants: [
          {
            src: [
              './src/assets/fonts/MyriadPro-Bold.woff2',
              './src/assets/fonts/MyriadPro-Bold.woff',
            ],
            weight: 700,
            style: 'normal',
          },
        ],
      },
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
