import type { APIRoute } from 'astro';
import { INDEXABLE } from '../../site.config.mjs';

export const GET: APIRoute = ({ site }) => {
  const body = INDEXABLE
    ? `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`
    : `# Pre-launch: content is still placeholder data from the previous edition.
# Crawling is allowed on purpose so that crawlers can read the noindex
# directive served on every page (see meta robots and the X-Robots-Tag header).
# Blocking here instead would stop them reading it.
User-agent: *
Allow: /
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
