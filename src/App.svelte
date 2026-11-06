<script>
  import Background from '$lib/components/layout/Background.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Hero from '$lib/sections/Hero.svelte';
  import About from '$lib/sections/About.svelte';
  import Services from '$lib/sections/Services.svelte';
  import Team from '$lib/sections/Team.svelte';
  import Process from '$lib/sections/Process.svelte';
  import Contact from '$lib/sections/Contact.svelte';
  import { LANGS, settings, t } from '$lib/state/settings.svelte.js';

  // Runs whenever language or theme changes: keeps <html> in sync.
  $effect(() => {
    const root = document.documentElement;
    const lang = LANGS.find((l) => l.code === settings.lang) ?? LANGS[0];
    const title = t('meta.title');
    const description = t('hero.subtitle');
    const locale = lang.code === 'en' ? 'en_US' : lang.code === 'ps' ? 'ps_AF' : 'fa_IR';
    const ogImage = '/favicon.svg';
    const configuredSiteUrl =
      typeof import.meta.env !== 'undefined' && import.meta.env.VITE_SITE_URL
        ? String(import.meta.env.VITE_SITE_URL).replace(/\/+$/, '')
        : '';
    const hostname = window.location.hostname;
    const siteUrl = configuredSiteUrl || (hostname === 'localhost' || hostname === '127.0.0.1' ? '' : window.location.origin);
    const canonicalUrl = siteUrl ? new URL(window.location.pathname || '/', siteUrl).href : null;

    root.lang = lang.code;
    root.dir = lang.dir;
    document.title = title;

    const setMeta = (selector, value, attribute = 'content') => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[name="robots"]', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMeta('meta[name="theme-color"]', '#f77b07');
    setMeta('meta[property="og:locale"]', locale);
    setMeta('meta[property="og:locale:alternate"]', 'fa_IR, en_US, ps_AF');
    if (canonicalUrl) setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:image:alt"]', 'iBuildo logo');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonicalUrl) canonical.setAttribute('href', canonicalUrl);

    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = settings.theme;
  });
</script>

<svelte:head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'iBuildo',
      alternateName: ['آی بیلدو', 'iBuildo'],
      description: t('hero.subtitle'),
      url: '/',
      logo: '/favicon.svg',
      inLanguage: settings.lang === 'en' ? ['en'] : settings.lang === 'ps' ? ['ps'] : ['fa'],
      areaServed: ['Afghanistan'],
      knowsAbout: [
        'UI/UX design',
        'Frontend development',
        'Backend development',
        'Mobile app development',
        'Website development'
      ]
    })}
  </script>
</svelte:head>

<Background />
<Header />
<main id="top">
  <Hero />
  <About />
  <Services />
  <Team />
  <Process />
  <Contact />
</main>
<Footer />

<style>
  main {
    position: relative;
    z-index: 1;
  }
</style>
