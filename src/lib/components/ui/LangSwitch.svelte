<script>
  import { LANGS, settings, setLang, t } from '$lib/state/settings.svelte.js';
</script>

<div class="lang" role="group" aria-label={t('a11y.language')}>
  {#each LANGS as lang (lang.code)}
    <button aria-pressed={settings.lang === lang.code} onclick={() => setLang(lang.code)}>
      {lang.label}
    </button>
  {/each}
</div>

<style>
  .lang {
    display: flex;
    border: 1px solid var(--line);
    border-radius: 10px;
    overflow: hidden;
  }
  button {
    background: none;
    border: 0;
    color: var(--muted);
    font-size: 0.82rem;
    padding: 4px 10px;
    cursor: pointer;
  }
  button[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  @media (max-width: 520px) {
    button {
      padding: 5px 7px;
      font-size: 0.75rem;
    }
  }
  @media (max-width: 360px) {
    button {
      padding: 5px;
    }
  }
</style>
