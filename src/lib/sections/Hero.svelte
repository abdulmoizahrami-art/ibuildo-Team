<script>
  import HeroIllustration from '$lib/components/illustrations/HeroIllustration.svelte';
  import { t } from '$lib/state/settings.svelte.js';
</script>

<section class="hero">
  <div class="wrap grid">
    <div class="text">
      <!-- {@html}: the translation contains <b>/<span> for line break and orange words -->
      <h1>{@html t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <div class="actions">
        <a class="btn primary" href="#contact">{t('common.start')}</a>
        <a class="btn ghost" href="#team">{t('hero.meet')}</a>
      </div>
    </div>
    <div class="visual"><HeroIllustration /></div>
  </div>
</section>

<style>
  .hero {
    padding: 110px 0 90px;
  }
  .grid {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 32px;
    align-items: center;
  }
  .text > * {
    animation: rise 0.8s both;
  }
  .text p {
    animation-delay: 0.12s;
  }
  .text .actions {
    animation-delay: 0.24s;
  }

  h1 {
    font-size: clamp(1.6rem, 4.4vw, 3rem);
    font-weight: 800;
    line-height: 1.4;
  }
  h1 :global(b) {
    color: var(--accent);
    font-weight: 800;
  }
  h1 :global(.ln) {
    display: block;
  }
  /* Persian: keep each of the two headline lines unbroken */
  :global(html[lang='fa']) .hero h1 :global(.ln) {
    white-space: nowrap;
  }

  p {
    color: var(--muted);
    font-size: 1.15rem;
    max-width: 48ch;
    margin: 24px 0 40px;
  }
  .actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  @media (max-width: 900px) and (min-width: 761px) {
    h1 {
      font-size: clamp(1.5rem, 3.9vw, 2.4rem);
    }
    :global(html[lang='ps']) .hero h1 {
      font-size: clamp(1.3rem, 3.3vw, 2.1rem);
    }
  }
  @media (max-width: 760px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .visual {
      order: 2;
    }
    h1 {
      font-size: clamp(1.6rem, 7vw, 3.2rem);
    }
    :global(html[lang='ps']) .hero h1 {
      font-size: clamp(1.4rem, 5.6vw, 2.8rem);
    }
  }
  @media (max-width: 600px) {
    .hero {
      padding: 48px 0 40px;
    }
    .actions :global(.btn) {
      flex: 1 1 150px;
    }
  }
</style>
