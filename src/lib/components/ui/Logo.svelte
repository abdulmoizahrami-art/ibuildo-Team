<script>
  import logo from '$assets/brand/logo.svg';
  import { t } from '$lib/state/settings.svelte.js';

  // The file is the full mark (icon, name, and slogan). Size it from outside
  // with the --logo-h CSS variable. Do not crop it: the bottom of the icon
  // and the slogan sit in the lower part of the same image.
  let { variant = 'full' } = $props();
</script>

<a class="logo {variant}" href="#hero" aria-label={t('a11y.home')}>
  <img src={logo} alt="iBuildo" />
</a>

<style>
  .logo {
    display: block;
    line-height: 0;
  }
  img {
    display: block;
    height: var(--logo-h, 42px);
    width: auto;
  }
</style>
