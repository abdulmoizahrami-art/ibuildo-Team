<script>
  import { onMount } from 'svelte';
  import Background from '$lib/components/layout/Background.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Hero from '$lib/sections/Hero.svelte';
  import About from '$lib/sections/About.svelte';
  import Services from '$lib/sections/Services.svelte';
  import Team from '$lib/sections/Team.svelte';
  import Process from '$lib/sections/Process.svelte';
  import Contact from '$lib/sections/Contact.svelte';
  import { applyDocumentSeo } from '$lib/seo/apply.js';
  import { readLangFromLocation, writeLangPath } from '$lib/seo/url.js';
  import { settings, setLang, t } from '$lib/state/settings.svelte.js';

  // Language owns the document title, meta tags, and crawlable URL.
  $effect(() => {
    applyDocumentSeo(settings.lang);
    writeLangPath(settings.lang);
  });

  $effect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = settings.theme;
  });

  onMount(() => {
    const onPop = () => {
      const fromLocation = readLangFromLocation(location.pathname, location.search);
      setLang(fromLocation ?? 'fa');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  });
</script>

<a class="skip" href="#top">{t('a11y.skip')}</a>
<Background />
<Header />
<main id="top" tabindex="-1">
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
  main:focus {
    outline: none;
  }
  .skip {
    position: absolute;
    inset-inline-start: 16px;
    top: calc(env(safe-area-inset-top, 0px) + 8px);
    z-index: 20;
    padding: 8px 14px;
    border-radius: 10px;
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 700;
    transform: translateY(-160%);
  }
  .skip:focus {
    transform: none;
  }
</style>
