import { createClient } from "$lib/prismicio";

export const prerender = 'auto';

export async function load({ fetch, url }: { fetch: any, url: any }) {
    const client = createClient({ fetch });

    const lang = url.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';

    let nav;

    try {
        nav = await client.getSingle('nav', { lang });
    } catch (error) {
        console.error('Failed to fetch navigation data from Prismic:', error);
        nav = null;
    }
    return {
        nav,
    };
}
