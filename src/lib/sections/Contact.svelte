<script>
  import Icon from '$lib/components/ui/Icon.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
  import { CONTACT } from '$lib/config.js';
  import { t } from '$lib/state/settings.svelte.js';
  import { phoneLink, whatsappLink } from '$lib/utils/links.js';
</script>

<section class="contact" id="contact" aria-labelledby="contact-heading">
  <div class="wrap">
    <div class="contact-content">
      <div class="brand-bar">
        <span class="rule" aria-hidden="true"></span>
        <Logo variant="wordmark" />
        <span class="rule" aria-hidden="true"></span>
      </div>

      <h2 id="contact-heading">پروژه‌تان را با هم <span>شروع</span> کنیم</h2>
      <p class="lead">چند خط درباره ایده‌تان بنویسید، به‌زودی با شما تماس می‌گیریم.</p>

      <div class="actions">
        <a class="btn action primary" href={phoneLink(CONTACT.phone)}>
          <span class="icon-wrap" aria-hidden="true"><Icon name="phone" size={18} /></span>
          <span class="ltr">{CONTACT.phone}</span>
        </a>

        <a
          class="btn action secondary"
          href={whatsappLink(CONTACT.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="icon-wrap" aria-hidden="true"><Icon name="whatsapp" size={18} /></span>
          <span>گفتگو در واتساپ</span>
        </a>
      </div>

      <div class="divider" aria-hidden="true"></div>

      <ul class="meta" aria-label={t('a11y.contactDetails')}>
        <li>
          <span class="meta-icon" aria-hidden="true"><Icon name="location" size={18} /></span>
          <div class="meta-copy">
            <small>آدرس</small>
            <span>{CONTACT.location}</span>
          </div>
        </li>
        <li>
          <span class="meta-icon" aria-hidden="true"><Icon name="mail" size={18} /></span>
          <div class="meta-copy">
            <small>ایمیل</small>
            <span class="ltr">{CONTACT.email}</span>
          </div>
        </li>
        <li>
          <span class="meta-icon" aria-hidden="true"><Icon name="phone" size={18} /></span>
          <div class="meta-copy">
            <small>تماس</small>
            <span class="ltr">{CONTACT.phone}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<style>
  .contact {
    position: relative;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .contact-content {
    position: relative;
  }

  .brand-bar,
  h2,
  p,
  .actions,
  .divider,
  .meta {
    position: relative;
    z-index: 1;
  }

  .brand-bar {
    display: grid;
    grid-template-columns: minmax(32px, 1fr) auto minmax(32px, 1fr);
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .rule {
    display: block;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.65), transparent);
  }

  .brand-bar :global(.logo) {
    --logo-h: 52px;
    margin: 0 auto;
  }

  h2 {
    margin: 0;
    text-align: center;
    font-size: clamp(1.8rem, 3.2vw, 3.1rem);
    font-weight: 800;
    color: var(--text);
  }

  h2 span {
    color: var(--accent);
  }

  p {
    margin: 14px auto 0;
    max-width: 54ch;
    text-align: center;
    color: var(--muted);
    font-size: 1rem;
  }

  .lead {
    color: var(--muted);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
  }

  .action {
    min-height: 50px;
    padding: 0 20px;
    border-radius: 999px;
    font-size: 0.98rem;
    font-weight: 700;
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      border-color 0.2s,
      background 0.2s;
  }

  .action:hover {
    transform: translateY(-1px);
  }

  .action.primary {
    background: var(--accent);
    color: var(--on-accent);
    border-color: var(--accent);
    box-shadow: 0 0 22px rgb(var(--accent-rgb) / 0.18);
  }

  .action.secondary {
    background: transparent;
    color: var(--text);
    border-color: rgb(var(--accent-rgb) / 0.55);
    box-shadow: inset 0 0 0 1px rgb(var(--accent-rgb) / 0.08);
  }

  .icon-wrap,
  .meta-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex: none;
  }

  .primary .icon-wrap {
    color: var(--on-accent);
  }

  .secondary .icon-wrap {
    color: var(--accent);
  }

  .divider {
    height: 1px;
    margin-top: 24px;
    background: linear-gradient(90deg, transparent, var(--line), transparent);
  }

  .meta {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin: 18px 0 0;
    padding: 0;
  }

  .meta li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 64px;
    padding: 10px 12px;
    border-inline-start: 1px solid var(--line);
    text-align: start;
  }

  .meta li:first-child {
    border-inline-start: 0;
  }

  .meta-icon {
    color: var(--accent);
    border: 1px solid rgb(var(--accent-rgb) / 0.28);
    border-radius: 50%;
    background: rgb(var(--accent-rgb) / 0.06);
  }

  .meta-copy {
    display: grid;
    gap: 2px;
  }

  .meta-copy small {
    color: var(--muted);
    font-size: 0.76rem;
    letter-spacing: 0.02em;
  }

  .meta-copy span {
    color: var(--text);
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.6;
  }

  .ltr {
    direction: ltr;
    unicode-bidi: plaintext;
  }

  @media (max-width: 780px) {
    .meta {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .meta li {
      justify-content: flex-start;
      border-inline-start: 0;
      border-top: 1px solid var(--line);
      padding-top: 14px;
    }

    .meta li:first-child {
      border-top: 0;
      padding-top: 0;
    }
  }

  @media (max-width: 520px) {
    .actions {
      flex-direction: column;
    }

    .action {
      width: 100%;
      justify-content: center;
    }

    .brand-bar {
      gap: 10px;
    }

    .brand-bar :global(.logo) {
      --logo-h: 46px;
    }
  }
</style>
