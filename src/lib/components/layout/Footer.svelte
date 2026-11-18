<script>
  import Logo from '$lib/components/ui/Logo.svelte';
  import { FOOTER_NAV } from '$lib/config.js';
  import { t } from '$lib/state/settings.svelte.js';
</script>

<footer>
  <div class="wrap">
    <nav aria-label={t('a11y.footerNavigation')}>
      {#each FOOTER_NAV as item (item.id)}
        <a href="#{item.id}">{t(item.label)}</a>
      {/each}
    </nav>
    <div class="row">
      <div class="brand"><Logo variant="full" /></div>
      <span>{t('footer.copy')}</span>
    </div>
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
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    margin-bottom: 22px;
  }
  nav a:hover {
    color: var(--text);
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
    nav {
      justify-content: center;
    }
    .row {
      flex-direction: column;
      text-align: center;
    }
    .brand {
      --logo-h: 44px;
    }
  }
</style>
