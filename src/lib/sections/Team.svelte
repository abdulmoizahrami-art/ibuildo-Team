<script>
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import TeamCard from '$lib/components/cards/TeamCard.svelte';
  import { t } from '$lib/state/settings.svelte.js';
  import { TEAM } from '$lib/data/team.js';
</script>

<section id="team" class="flush-top">
  <div class="wrap">
    <SectionHeading title={t('nav.team')} lead={t('team.lead')} />
    <div class="grid">
      {#each TEAM as member (member.id)}
        <TeamCard {member} />
      {/each}
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  /* Tablet: two columns, the third card spans the full row */
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid > :global(:last-child) {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .grid > :global(:last-child) {
      grid-column: auto;
    }
  }
</style>
