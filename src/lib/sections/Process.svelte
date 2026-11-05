<script>
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { t } from '$lib/state/settings.svelte.js';
  import { PROCESS_STEPS } from '$lib/data/process.js';
</script>

<section id="process" class="flush-top">
  <div class="wrap">
    <SectionHeading title={t('nav.process')} lead={t('process.lead')} />
    <div class="steps">
      {#each PROCESS_STEPS as id (id)}
        <div class="step">
          <h3>{t(`process.steps.${id}.title`)}</h3>
          <p>{t(`process.steps.${id}.desc`)}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .steps {
    counter-reset: step;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    border-top: 1px solid rgb(var(--accent-rgb) / 0.65);
  }
  .step {
    position: relative;
    padding: 28px 0 0;
    padding-inline-end: 24px;
  }
  /* The numbered glowing circle sitting on the line */
  .step::before {
    counter-increment: step;
    content: counter(step);
    position: absolute;
    top: -15px;
    inset-inline-start: 0;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    background: var(--bg);
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 700;
    box-shadow: 0 0 14px rgb(var(--accent-rgb) / 0.7);
  }
  h3 {
    margin-top: 10px;
    font-size: 1.1rem;
  }
  p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 0.95rem;
  }

  /* Mobile: the line turns vertical */
  @media (max-width: 600px) {
    .steps {
      grid-template-columns: 1fr;
      gap: 28px;
      margin-inline-start: 15px;
      padding-inline-start: 28px;
      border-top: 0;
      border-inline-start: 1px solid rgb(var(--accent-rgb) / 0.65);
    }
    .step {
      padding: 0;
    }
    .step::before {
      top: 0;
      inset-inline-start: -44px;
    }
  }
</style>
