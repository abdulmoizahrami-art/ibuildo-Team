<script>
  import AboutIcons from '$lib/components/illustrations/AboutIcons.svelte';
  import { t } from '$lib/state/settings.svelte.js';
</script>

<section class="about">
  <div class="wrap grid">
    <p>{@html t('about.text')}</p>
    <AboutIcons />
  </div>
</section>

<style>
  .about {
    padding-top: clamp(24px, 5vw, 56px);
  }
  .grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    align-items: center;
  }
  p {
    margin: 0;
    max-width: 30em;
    font-weight: 500;
    font-size: clamp(1.1rem, 2.2vw, 1.45rem);
    line-height: 2;
  }
  p :global(em) {
    font-style: normal;
    color: var(--accent);
  }
  @media (max-width: 900px) {
    .grid {
      gap: 28px;
    }
  }
  @media (max-width: 760px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
