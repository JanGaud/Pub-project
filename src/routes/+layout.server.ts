import { createClient } from "$lib/prismicio";

export const prerender = 'auto';

export async function load({ fetch, url }: { fetch: any, url: any }) {
    const client = createClient({ fetch });

    // Determine the language from the URL
    const lang = url.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';

    let nav;
    let settings;
    let footer;
    let openingHours;
    let page_errors;

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

    try {
        footer = await client.getSingle('footer', { lang });
    } catch (error) {
        console.error('Failed to fetch footer data from Prismic:', error);
        footer = null;
    }


    try {
        // Fetch opening hours data from Prismic using the determined language
        openingHours = await client.getAllByType('opening_hours', { lang });
    } catch (error) {
        console.error('Failed to fetch navigation data from Prismic:', error);
        openingHours = null;
    }

    try {
        // Fetch navigation data from Prismic using the determined language
        page_errors = await client.getSingle('error_page', { lang });
    } catch (error) {
        console.error('Failed to fetch page error data from Prismic:', error);
        page_errors = null;
    }

    // Return the fetched data to be accessible in +layout.svelte
    return {
        nav,
        settings,
        page_errors,
        footer,
        openingHours,
        url: url.pathname,
        lang,
    };
}
