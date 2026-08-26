import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Note: kit options (including the adapter) are configured in vite.config.ts's
// `sveltekit()` plugin call instead of here — when options are passed to that
// plugin directly, this file's `kit` block is ignored by the SvelteKit Vite plugin.
// `preprocess` here is still used by editor tooling and svelte-check.

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess()
};

export default config;
