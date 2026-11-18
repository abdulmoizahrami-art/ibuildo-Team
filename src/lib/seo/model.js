import { CONTACT } from '../config.js';
import { PROCESS_STEPS } from '../data/process.js';
import { SERVICES } from '../data/services.js';
import { translate } from '../i18n/translate.js';
import { phoneLink, whatsappLink } from '../utils/links.js';
import { LANG_META, absoluteUrl, languagePath } from './url.js';

export const SITE_NAME = 'iBuildo';
export const TEAM_IDS = ['mohammad', 'abdulmoez', 'rasul'];
export const OG_IMAGE = '/og-image.png';

const LOCALES = Object.values(LANG_META).map((lang) => lang.locale);

function plainText(value) {
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function publishableEmail(email) {
  if (!email || /your-email|example\.com|changeme/i.test(email)) return undefined;
  return email;
}

function withHash(url, hash) {
  return `${String(url).replace(/#.*$/, '')}#${hash}`;
}

function imageUrl(origin, path) {
  if (!path || typeof path !== 'string') return undefined;
  if (/^(https?:|data:)/.test(path)) return path;
  return absoluteUrl(origin, path);
}

/**
 * Everything search engines and social crawlers need for one language.
 * `origin` is empty in development; production should set VITE_SITE_URL.
 */
export function buildSeoModel(lang, origin = '', photos = {}) {
  const code = lang === 'en' || lang === 'ps' ? lang : 'fa';
  const meta = LANG_META[code];
  const t = (key) => translate(code, key);
  const canonical = absoluteUrl(origin, languagePath(code));
  const home = absoluteUrl(origin, '/');
  const orgId = absoluteUrl(origin, '/#organization');
  const websiteId = absoluteUrl(origin, '/#website');
  const pageId = withHash(canonical, 'webpage');
  const image = imageUrl(origin, OG_IMAGE);
  const logo = imageUrl(origin, '/favicon.svg');
  const email = publishableEmail(CONTACT.email);
  const phone = CONTACT.phone || undefined;
  const alternates = [
    { hreflang: 'fa', href: home },
    { hreflang: 'en', href: absoluteUrl(origin, '/en/') },
    { hreflang: 'ps', href: absoluteUrl(origin, '/ps/') },
    { hreflang: 'x-default', href: home }
  ];

  const services = SERVICES.map((service, index) => ({
    title: t(`services.items.${service.id}.title`),
    description: t(`services.items.${service.id}.desc`),
    position: index + 1
  }));
  const members = TEAM_IDS.map((id) => ({
    id,
    name: t(`team.members.${id}.name`),
    role: t(`team.members.${id}.role`),
    description: t(`team.members.${id}.desc`),
    image: imageUrl(origin, photos[id])
  }));
  const steps = PROCESS_STEPS.map((id, index) => ({
    title: t(`process.steps.${id}.title`),
    description: t(`process.steps.${id}.desc`),
    position: index + 1
  }));

  const organization = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: SITE_NAME,
    alternateName: ['آی بیلدو', 'iBuildo'],
    url: home,
    description: t('meta.description'),
    logo: { '@type': 'ImageObject', url: logo },
    image,
    telephone: phone,
    ...(email ? { email } : {}),
    address: { '@type': 'PostalAddress', addressCountry: 'AF' },
    location: { '@type': 'Place', name: t('contact.address') },
    areaServed: [
      { '@type': 'Country', name: 'Afghanistan' },
      { '@type': 'City', name: 'Kabul' },
      { '@type': 'City', name: 'Kunduz' },
      { '@type': 'AdministrativeArea', name: 'Badakhshan' }
    ],
    knowsLanguage: ['fa', 'en', 'ps'],
    knowsAbout: services.map((service) => service.title),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'customer support',
      url: whatsappLink(CONTACT.whatsapp),
      availableLanguage: ['fa', 'en', 'ps'],
      areaServed: 'AF'
    },
    employee: members.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      description: member.description,
      ...(member.image ? { image: member.image } : {}),
      worksFor: { '@id': orgId },
      url: withHash(canonical, 'team')
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('nav.services'),
      itemListElement: services.map((service) => ({
        '@type': 'ListItem',
        position: service.position,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@id': orgId },
          areaServed: 'AF',
          url: withHash(canonical, 'services')
        }
      }))
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: home,
        name: SITE_NAME,
        alternateName: ['آی بیلدو', 'iBuildo'],
        description: t('meta.description'),
        inLanguage: ['fa', 'en', 'ps'],
        publisher: { '@id': orgId }
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: canonical,
        name: t('meta.title'),
        description: t('meta.description'),
        inLanguage: code,
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#hero-heading', '#about-heading', '#services-heading']
        }
      },
      {
        '@type': 'HowTo',
        '@id': withHash(canonical, 'process'),
        name: t('nav.process'),
        description: t('process.lead'),
        inLanguage: code,
        url: withHash(canonical, 'process'),
        step: steps.map((step) => ({
          '@type': 'HowToStep',
          position: step.position,
          name: step.title,
          text: step.description,
          url: withHash(canonical, 'process')
        }))
      }
    ]
  };

  return {
    lang: code,
    htmlLang: meta.htmlLang,
    dir: meta.dir,
    locale: meta.locale,
    alternateLocales: LOCALES.filter((locale) => locale !== meta.locale),
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    imageAlt: t('meta.imageAlt'),
    canonical,
    alternates,
    image,
    imageType: 'image/png',
    imageWidth: 1200,
    imageHeight: 630,
    jsonLd,
    noscript: {
      heroTitle: plainText(t('hero.title')),
      heroSubtitle: t('hero.subtitle'),
      aboutTitle: t('about.title'),
      aboutText: plainText(t('about.text')),
      servicesTitle: t('nav.services'),
      servicesLead: t('services.lead'),
      services,
      teamTitle: t('nav.team'),
      teamLead: t('team.lead'),
      members,
      processTitle: t('nav.process'),
      processLead: t('process.lead'),
      steps,
      contactTitle: plainText(t('contact.sectionTitle')),
      contactLead: t('contact.sectionDescription'),
      response: t('contact.fast.desc'),
      addressLabel: t('contact.addressLabel'),
      address: t('contact.address'),
      phoneLabel: t('contact.phoneLabel'),
      phone: CONTACT.phoneDisplay,
      phoneHref: phoneLink(CONTACT.phone),
      whatsappLabel: t('contact.whatsapp'),
      whatsappHref: whatsappLink(CONTACT.whatsapp)
    }
  };
}
