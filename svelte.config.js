import preprocess from 'svelte-preprocess'; // Ensure this import is included
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: preprocess({ // Use the imported preprocess here
		typescript: true,
	}),
};

export default config;
