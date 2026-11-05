<script>
  import Icon from '$lib/components/ui/Icon.svelte';
  import { t } from '$lib/state/settings.svelte.js';

  let { service } = $props(); // { id, icon } from data/services.js
</script>

<article class="card">
  <span class="icon"><Icon name={service.icon} size={26} /></span>
  <h3>{t(`services.items.${service.id}.title`)}</h3>
  <p>{t(`services.items.${service.id}.desc`)}</p>
</article>

<style>
  .icon {
    display: flex;
    justify-content: flex-end; /* icon sits on the "end" side: left in RTL, right in LTR */
    color: var(--accent);
    margin-bottom: 18px;
  }
</style>
