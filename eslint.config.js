import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      // {@html} is only used for our own translation strings and icon markup, never user input.
      'svelte/no-at-html-tags': 'off'
    }
  },
  { ignores: ['dist/', 'node_modules/'] }
];
