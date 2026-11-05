import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';

// Aliases let us import with "$lib/..." instead of long "../../.." paths.
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
      $assets: fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  }
});
