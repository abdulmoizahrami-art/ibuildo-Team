<script>
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import ServiceCard from '$lib/components/cards/ServiceCard.svelte';
  import { t } from '$lib/state/settings.svelte.js';
  import { SERVICES } from '$lib/data/services.js';
</script>

<section id="services" class="flush-top">
  <div class="wrap">
    <SectionHeading title={t('nav.services')} lead={t('services.lead')} />
    <div class="grid">
      {#each SERVICES as service (service.id)}
        <ServiceCard {service} />
      {/each}
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
