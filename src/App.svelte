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

    root.lang = lang.code;
    root.dir = lang.dir;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description);

    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = settings.theme;
  });
</script>

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
