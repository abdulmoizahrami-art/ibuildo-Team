import { TEAM } from '../data/team.js';
import { buildSeoModel } from './model.js';
import { resolveOrigin } from './url.js';

function upsertMeta(attr, key, content) {
  let node = document.head.querySelector(`meta[${attr}="${CSS.escape(key)}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

/** Keep the live document in sync when the visitor changes language. */
export function applyDocumentSeo(lang) {
  const photos = Object.fromEntries(
    TEAM.filter((member) => member.photo).map((member) => [member.id, member.photo])
  );
  const model = buildSeoModel(lang, resolveOrigin(), photos);
  const root = document.documentElement;
  root.lang = model.htmlLang;
  root.dir = model.dir;
  document.title = model.title;

  const tags = [
    ['name', 'description', model.description],
    ['name', 'keywords', model.keywords],
    ['name', 'author', 'iBuildo'],
    ['name', 'application-name', 'iBuildo'],
    ['name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', 'iBuildo'],
    ['property', 'og:title', model.title],
    ['property', 'og:description', model.description],
    ['property', 'og:url', model.canonical],
    ['property', 'og:locale', model.locale],
    ['property', 'og:image', model.image],
    ['property', 'og:image:alt', model.imageAlt],
    ['property', 'og:image:type', model.imageType],
    ['property', 'og:image:width', String(model.imageWidth)],
    ['property', 'og:image:height', String(model.imageHeight)],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', model.title],
    ['name', 'twitter:description', model.description],
    ['name', 'twitter:image', model.image],
    ['name', 'twitter:image:alt', model.imageAlt]
  ];
  for (const [attr, key, value] of tags) upsertMeta(attr, key, value);

  document
    .querySelectorAll('meta[property="og:locale:alternate"]')
    .forEach((node) => node.remove());
  for (const locale of model.alternateLocales) {
    const node = document.createElement('meta');
    node.setAttribute('property', 'og:locale:alternate');
    node.setAttribute('content', locale);
    document.head.appendChild(node);
  }

  upsertLink('canonical', model.canonical);
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
  for (const alt of model.alternates) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = alt.hreflang;
    link.href = alt.href;
    document.head.appendChild(link);
  }

  let script = document.getElementById('seo-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(model.jsonLd).replace(/</g, '\\u003c');
}
