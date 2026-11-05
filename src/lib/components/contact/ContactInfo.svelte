<script>
  import Icon from '$lib/components/ui/Icon.svelte';
  import { t } from '$lib/state/settings.svelte.js';
  import { CONTACT } from '$lib/config.js';
  import { whatsappLink, phoneLink } from '$lib/utils/links.js';
</script>

<div class="info">
  <!-- {@html}: the translation contains <b> for the orange word (our own text, never user input) -->
  <h2>{@html t('contact.title')}</h2>
  <p class="lead">{t('contact.lead')}</p>

  <div class="fast">
    <span class="bolt"><Icon name="bolt" size={22} solid /></span>
    <div>
      <b>{t('contact.fast.title')}</b>
      <p>{t('contact.fast.desc')}</p>
    </div>
  </div>

  <div class="buttons">
    <a
      class="pill whatsapp"
      href={whatsappLink(CONTACT.whatsapp)}
      target={CONTACT.whatsapp ? '_blank' : undefined}
      rel="noopener"
    >
      <Icon name="whatsapp" size={17} />{t('contact.whatsapp')}
    </a>
    <a class="pill call" href={phoneLink(CONTACT.phone)}>
      <Icon name="phone" size={17} />{t('contact.call')}
    </a>
  </div>
</div>

<style>
  h2 {
    text-wrap: balance;
    font-size: clamp(1.8rem, 3.9vw, 2.9rem);
    font-weight: 800;
    line-height: 1.4;
  }
  h2 :global(b) {
    color: var(--accent);
  }
  .lead {
    margin: 14px 0 32px;
    color: var(--muted);
    max-width: 56ch;
    font-size: 1.05rem;
  }

  .fast {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 32px;
  }
  .fast b {
    display: block;
  }
  .fast p {
    margin: 0;
    color: var(--muted);
    font-size: 0.92rem;
  }
  .bolt {
    width: 56px;
    height: 56px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    color: var(--accent);
    box-shadow: 0 0 22px rgb(var(--accent-rgb) / 0.25);
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 42px;
    padding: 8px 18px;
    border: 1px solid var(--line);
    border-radius: 12px;
    font-size: 0.9rem;
    transition: box-shadow 0.2s;
  }
  .pill:hover {
    box-shadow: 0 0 0 3px rgb(var(--accent-rgb) / 0.12);
  }
  .whatsapp {
    color: var(--green);
    border-color: color-mix(in srgb, var(--green) 50%, transparent);
    background: color-mix(in srgb, var(--green) 9%, transparent);
  }
  .call {
    color: var(--accent);
    border-color: rgb(var(--accent-rgb) / 0.55);
    background: rgb(var(--accent-rgb) / 0.08);
  }

  @media (min-width: 421px) {
    .pill {
      white-space: nowrap;
    }
  }
  @media (max-width: 480px) {
    .buttons {
      align-items: stretch;
    }
    .pill {
      flex: 1 1 0;
      justify-content: center;
      padding: 8px 10px;
      font-size: 0.85rem;
    }
  }
  @media (max-width: 420px) {
    .pill {
      white-space: normal;
      text-align: center;
      line-height: 1.35;
    }
  }
</style>
