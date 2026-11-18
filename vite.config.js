import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import { ibuildoSeoPlugin } from './src/lib/seo/vitePlugin.js';

// Aliases let us import with "$lib/..." instead of long "../../.." paths.
// VITE_SITE_URL (for example https://ibuildo.com) makes canonical and sitemap URLs absolute.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [svelte(), ibuildoSeoPlugin(env.VITE_SITE_URL || '')],
    resolve: {
      alias: {
        $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
        $assets: fileURLToPath(new URL('./src/assets', import.meta.url))
      }
    }
  };
});
