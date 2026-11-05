<script>
  import Logo from '$lib/components/ui/Logo.svelte';
  import { t } from '$lib/state/settings.svelte.js';
</script>

<footer>
  <div class="wrap row">
    <div class="brand"><Logo variant="full" /></div>
    <span>{t('footer.copy')}</span>
  </div>
</footer>

<style>
  footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid var(--line);
    padding: 36px 0;
    color: var(--muted);
    font-size: 0.9rem;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .brand {
    --logo-h: 52px;
  }
  @media (max-width: 600px) {
    .row {
      flex-direction: column;
      text-align: center;
    }
    .brand {
      --logo-h: 44px;
    }
  }
</style>
