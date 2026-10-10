import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		}),
		prerender: {
			handleMissingId: 'ignore'
		}
	},
	preprocess: vitePreprocess()
};

export default config;