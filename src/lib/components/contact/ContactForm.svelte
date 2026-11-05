<script>
  import Icon from '$lib/components/ui/Icon.svelte';
  import FormField from '$lib/components/ui/FormField.svelte';
  import { t } from '$lib/state/settings.svelte.js';
  import { sendProject } from '$lib/services/contact.js';
  import { validateProject, hasErrors } from '$lib/utils/validation.js';
  import { FORM_ANCHOR } from '$lib/utils/links.js';

  const emptyForm = () => ({ name: '', email: '', phone: '', subject: '', message: '' });

  // bind:value keeps these in sync with the inputs automatically.
  let form = $state(emptyForm());
  let invalid = $state({});
  let status = $state('idle'); // 'idle' | 'sending' | 'sent'

  async function submit(event) {
    event.preventDefault();
    invalid = validateProject(form);
    if (hasErrors(invalid)) return;

    status = 'sending';
    await sendProject($state.snapshot(form));
    status = 'sent';
    form = emptyForm();
  }
</script>

<form id={FORM_ANCHOR.slice(1)} novalidate onsubmit={submit}>
  <div class="row">
    <FormField
      label={t('contact.form.name')}
      name="name"
      autocomplete="name"
      placeholder={t('contact.form.namePh')}
      bind:value={form.name}
      invalid={invalid.name}
    />
    <FormField
      label={t('contact.form.email')}
      name="email"
      type="email"
      dir="ltr"
      autocomplete="email"
      placeholder={t('contact.form.emailPh')}
      bind:value={form.email}
      invalid={invalid.email}
    />
  </div>

  <FormField
    label={t('contact.form.phone')}
    name="phone"
    type="tel"
    dir="ltr"
    autocomplete="tel"
    placeholder={t('contact.form.phonePh')}
    bind:value={form.phone}
    invalid={invalid.phone}
  />
  <FormField
    label={t('contact.form.subject')}
    name="subject"
    placeholder={t('contact.form.subjectPh')}
    bind:value={form.subject}
  />
  <FormField
    multiline
    label={t('contact.form.message')}
    name="message"
    placeholder={t('contact.form.messagePh')}
    bind:value={form.message}
    invalid={invalid.message}
  />

  <button class="btn primary submit" type="submit" disabled={status === 'sending'}>
    <span>{t('contact.form.send')}</span>
    <span class="arrow"><Icon name="arrow" size={20} /></span>
  </button>

  {#if status === 'sent'}
    <div class="ok" role="status">{t('contact.form.sent')}</div>
  {/if}
</form>

<style>
  form {
    display: grid;
    gap: 18px;
    padding: clamp(20px, 3.4vw, 36px);
    border: 1px solid rgb(var(--accent-rgb) / 0.4);
    border-radius: 28px;
    background: color-mix(in srgb, var(--card) 88%, transparent);
    box-shadow: 0 0 50px rgb(var(--accent-rgb) / 0.08);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 480px) {
    .row {
      grid-template-columns: 1fr;
    }
  }

  .submit {
    width: 100%;
    min-height: 52px;
    gap: 12px;
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
  }
  .submit:disabled {
    opacity: 0.7;
    cursor: progress;
  }
  .arrow {
    display: inline-flex;
  }
  :global(html[dir='ltr']) .arrow {
    transform: scaleX(-1); /* the arrow icon points left; flip it for LTR */
  }

  .ok {
    padding: 16px;
    border: 1px solid var(--accent);
    border-radius: 14px;
    color: var(--accent);
  }
</style>
