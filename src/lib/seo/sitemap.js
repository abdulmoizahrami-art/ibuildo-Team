import { absoluteUrl, languagePath } from './url.js';

const PAGES = [
  { lang: 'fa', priority: '1.0' },
  { lang: 'en', priority: '0.9' },
  { lang: 'ps', priority: '0.9' }
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Sitemap for `/`, `/en/`, and `/ps/`, with hreflang alternates. */
export function buildSitemapXml(origin = '') {
  const href = (lang) => escapeXml(absoluteUrl(origin, languagePath(lang)));
  const urls = PAGES.map((page) => {
    const links = [
      ...PAGES.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${href(alt.lang)}" />`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${href('fa')}" />`
    ].join('\n');
    return `  <url>
    <loc>${href(page.lang)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
${links}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
