<script>
  import { ICONS } from '$lib/data/icons.js';
  let { name, size = 20, solid = false } = $props();
</script>

<svg viewBox="0 0 24 24" width={size} height={size} class:solid aria-hidden="true">
  {@html ICONS[name]}
</svg>

<style>
  svg {
    flex: none;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  svg.solid {
    fill: currentColor;
    stroke: none;
  }
</style>
