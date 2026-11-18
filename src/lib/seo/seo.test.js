import { describe, expect, it } from 'vitest';
import { TEAM } from '../data/team.js';
import { DICTIONARIES } from '../i18n/translate.js';
import { TEAM_IDS, buildSeoModel } from './model.js';
import { escapeHtml, renderHeadTags, renderNoscript } from './render.js';
import { buildSitemapXml } from './sitemap.js';
import { languagePath, readLangFromLocation } from './url.js';

describe('language URLs', () => {
  it('maps each language to a crawlable path', () => {
    expect(languagePath('fa')).toBe('/');
    expect(languagePath('en')).toBe('/en/');
    expect(languagePath('ps')).toBe('/ps/');
  });

  it('reads language from the path, then the query', () => {
    expect(readLangFromLocation('/en/', '')).toBe('en');
    expect(readLangFromLocation('/en', '')).toBe('en');
    expect(readLangFromLocation('/ps/index.html', '')).toBe('ps');
    expect(readLangFromLocation('/', '?lang=ps')).toBe('ps');
    expect(readLangFromLocation('/', '?lang=nope')).toBeNull();
    expect(readLangFromLocation('/', '')).toBeNull();
  });
});

describe('search metadata', () => {
  it('keeps team ids aligned with the team data', () => {
    expect(TEAM.map((member) => member.id)).toEqual(TEAM_IDS);
  });

  it('builds absolute canonicals, services, people, and process steps', () => {
    const model = buildSeoModel('en', 'https://ibuildo.example');
    const graph = model.jsonLd['@graph'];
    const organization = graph.find((node) => [].concat(node['@type']).includes('Organization'));
    const page = graph.find((node) => node['@type'] === 'WebPage');
    const howTo = graph.find((node) => node['@type'] === 'HowTo');

    expect(model.canonical).toBe('https://ibuildo.example/en/');
    expect(model.title).toContain('iBuildo');
    expect(organization.email).toBeUndefined();
    expect(organization.telephone).toBe('+93740486712');
    expect(organization.hasOfferCatalog.itemListElement).toHaveLength(5);
    expect(organization.employee).toHaveLength(3);
    expect(howTo.step).toHaveLength(4);
    expect(page.inLanguage).toBe('en');
    expect(page.url).toBe('https://ibuildo.example/en/');
  });

  it('gives every language a title and a description', () => {
    for (const lang of ['fa', 'en', 'ps']) {
      const model = buildSeoModel(lang, 'https://ibuildo.example');
      expect(model.title.length).toBeGreaterThan(10);
      expect(model.title.length).toBeLessThan(70);
      expect(model.description.length).toBeGreaterThan(80);
      expect(model.description.length).toBeLessThan(200);
      expect(DICTIONARIES[lang].meta.keywords.length).toBeGreaterThan(10);
    }
  });

  it('renders head tags and a text copy of every section', () => {
    const model = buildSeoModel('fa', 'https://ibuildo.example');
    const head = renderHeadTags(model);
    const noscript = renderNoscript(model);

    expect(head).toContain('rel="canonical" href="https://ibuildo.example/"');
    expect(head).toContain('hreflang="en"');
    expect(head).toContain('hreflang="ps"');
    expect(head).toContain('application/ld+json');
    expect(head).not.toContain('your-email');
    expect(noscript).toContain('طراحی UI/UX');
    expect(noscript).toContain('محمد سید قاضی‌زاده');
    expect(noscript).toContain('مشاوره');
    expect(escapeHtml('"<&')).toBe('&quot;&lt;&amp;');
  });

  it('lists every language in the sitemap', () => {
    const xml = buildSitemapXml('https://ibuildo.example');
    expect(xml).toContain('<loc>https://ibuildo.example/</loc>');
    expect(xml).toContain('<loc>https://ibuildo.example/en/</loc>');
    expect(xml).toContain('<loc>https://ibuildo.example/ps/</loc>');
    expect(xml).toContain('hreflang="x-default"');
  });
});
