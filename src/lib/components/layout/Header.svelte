<script>
  import Logo from '$lib/components/ui/Logo.svelte';
  import LangSwitch from '$lib/components/ui/LangSwitch.svelte';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import { t } from '$lib/state/settings.svelte.js';
  import { NAV } from '$lib/config.js';

  let menuOpen = $state(false); // mobile menu
</script>

<header>
  <div class="wrap bar">
    <div class="brand"><Logo /></div>

    <nav id="main-navigation" class:open={menuOpen} aria-label={t('a11y.mainNavigation')}>
      {#each NAV as item (item.id)}
        <a href="#{item.id}" onclick={() => (menuOpen = false)}>{t(item.label)}</a>
      {/each}
    </nav>

    <div class="tools">
      <LangSwitch />
      <ThemeToggle />
      <button
        class="icon-btn burger"
        aria-label={t('a11y.menu')}
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        onclick={() => (menuOpen = !menuOpen)}
      >
        <Icon name="menu" size={18} />
      </button>
      <a class="btn primary cta" href="#contact">{t('common.start')}</a>
    </div>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: env(safe-area-inset-top, 0px);
    z-index: 11;
    background: var(--hdr);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 68px;
  }
  .brand {
    --logo-h: 34px;
  }
  nav {
    display: flex;
    gap: 28px;
    color: var(--muted);
    font-size: 0.95rem;
  }
  nav a:hover {
    color: var(--text);
  }
  .tools {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tools .cta {
    padding: 6px 18px;
  }
  .burger {
    display: none;
  }

  @media (max-width: 820px) {
    nav,
    .tools .cta {
      display: none;
    }
    .burger {
      display: grid;
    }
    nav.open {
      display: flex;
      position: absolute;
      top: 100%;
      inset-inline: 0;
      flex-direction: column;
      gap: 6px;
      padding: 12px clamp(16px, 4vw, 24px) 18px;
      background: var(--bg);
      border-bottom: 1px solid var(--line);
    }
    nav.open a {
      padding: 10px 0;
      font-size: 1.05rem;
    }
  }
  @media (max-width: 520px) {
    .bar {
      height: 60px;
      gap: 8px;
    }
    .tools {
      gap: 6px;
    }
    .brand {
      --logo-h: 26px;
    }
  }
  @media (max-width: 360px) {
    .brand {
      --logo-h: 22px;
    }
  }
</style>
