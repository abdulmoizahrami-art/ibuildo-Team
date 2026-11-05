<script>
  import { onMount } from 'svelte';
  import { startParticles } from '$lib/utils/particles.js';

  let canvas;

  // onMount runs once in the browser; the function it returns is the cleanup.
  onMount(() => startParticles(canvas));
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: var(--fx-opacity);
  }
</style>
