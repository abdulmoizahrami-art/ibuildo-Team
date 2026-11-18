import fs from 'node:fs';
import path from 'node:path';
import { buildSeoModel } from './model.js';
import { renderHeadTags, renderNoscript } from './render.js';
import { buildSitemapXml } from './sitemap.js';

function replaceBlock(html, name, content) {
  const pattern = new RegExp(`<!--seo-${name}:start-->[\\s\\S]*?<!--seo-${name}:end-->`);
  return html.replace(pattern, `<!--seo-${name}:start-->\n${content}\n    <!--seo-${name}:end-->`);
}

function localize(html, lang, origin) {
  const model = buildSeoModel(lang, origin);
  return replaceBlock(
    replaceBlock(html, 'head', renderHeadTags(model)),
    'noscript',
    renderNoscript(model)
  ).replace(/<html\b[^>]*>/, `<html lang="${model.htmlLang}" dir="${model.dir}">`);
}

/**
 * Injects crawlable meta and a no-JavaScript copy of every section.
 * Writes /en/ and /ps/ during build so each language has its own URL.
 * Set VITE_SITE_URL so canonical, Open Graph, and sitemap URLs are absolute.
 */
export function ibuildoSeoPlugin(siteUrl = '') {
  const origin = String(siteUrl || '').replace(/\/+$/, '');

  return {
    name: 'ibuildo-seo',
    transformIndexHtml(html) {
      return localize(html, 'fa', origin);
    },
    closeBundle() {
      const dist = path.resolve('dist');
      const indexPath = path.join(dist, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const built = fs.readFileSync(indexPath, 'utf8');
      fs.writeFileSync(indexPath, localize(built, 'fa', origin));
      for (const lang of ['en', 'ps']) {
        const dir = path.join(dist, lang);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), localize(built, lang, origin));
      }
      fs.writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemapXml(origin));

      if (!origin) {
        console.warn(
          '\n[seo] VITE_SITE_URL is not set. Canonical, Open Graph, and sitemap URLs are relative. Set VITE_SITE_URL=https://your-domain before the production build.\n'
        );
      }
    }
  };
}
