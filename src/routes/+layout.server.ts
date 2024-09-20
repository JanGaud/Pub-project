import { createClient } from "$lib/prismicio";

export const prerender = 'auto';

export async function load({ fetch, url }: { fetch: any, url: any }) {
    const client = createClient({ fetch });

    // Determine the language from the URL
    const lang = url.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';

    let nav;
    let settings;

    try {
        // Fetch navigation data from Prismic using the determined language
        nav = await client.getSingle('nav', { lang });
    } catch (error) {
        console.error('Failed to fetch navigation data from Prismic:', error);
        nav = null;
    }

    try {
        // Fetch settings data from Prismic using the determined language
        settings = await client.getSingle('settings', { lang });
    } catch (error) {
        console.error('Failed to fetch settings data from Prismic:', error);
        settings = null;
    }

    // Return the fetched data to be accessible in +layout.svelte
    return {
        nav,
        settings,
        lang, // Include the language to use it in your layout
    };
}
