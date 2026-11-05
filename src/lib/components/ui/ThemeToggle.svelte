<script>
  import Icon from './Icon.svelte';
  import { settings, cycleTheme, t } from '$lib/state/settings.svelte.js';
</script>

<!-- Cycles: system -> light -> dark. The icon shows the current mode. -->
<button class="icon-btn" onclick={cycleTheme} aria-label={t('a11y.theme')} title="Theme / پوسته">
  <Icon name={settings.theme} size={18} />
</button>
