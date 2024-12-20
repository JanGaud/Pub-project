import { NotFoundError, asText } from '@prismicio/client';
import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';

type Menu = {
	food?: any;
	beer?: any;
	cocktail?: any;
	specials?: any;
};

// @ts-ignore
export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	let menu: Menu = {};
	let flavors: any = [];

	try {
		// Fetch the page data based on the UID, using the `lang` parameter from `params`
		const page = await client.getByUID('page', params.uid, {
			lang: params.lang
		});

		if (!page) {
			throw error(404, 'Page not found');
		}

		// Fetch food data using the specified language
		try {
			menu.food = await client.getAllByType('food_menu', { lang: params.lang });
		} catch (fetchError) {
			console.error('Failed to fetch food data from Prismic:', fetchError);
			menu.food = null;
		}

		// Fetch beer data using the specified language
		try {
			menu.beer = await client.getAllByType('beer_menu', { lang: params.lang });
		} catch (fetchError) {
			console.error('Failed to fetch beer data from Prismic:', fetchError);
			menu.beer = null;
		}

		// Fetch cocktail data using the specified language
		try {
			menu.cocktail = await client.getAllByType('cocktail_menu', { lang: params.lang });
			flavors = await client.getAllByType('flavour_styles', { lang: params.lang });
		} catch (fetchError) {
			console.error('Failed to fetch cocktail data from Prismic:', fetchError);
			menu.cocktail = null;
		}

		// Fetch specials data
		try {
			menu.specials = await client.getAllByType('special_menu', { lang: params.lang });
		} catch (fetchError) {
			console.error('Failed to fetch specials data from Prismic:', fetchError);
			menu.specials = null;
		}

		return {
			page,
			menu,
			flavors,
			title: asText(page.data.title),
			meta_description: page.data.meta_description,
			meta_title: page.data.meta_title,
			meta_image: page.data.meta_image?.url
		};

	} catch (err) {
		if (err instanceof NotFoundError) {
			throw error(404, 'Page not found');
		} else {
			console.error('An unexpected error occurred:', err);
			throw error(500, 'Internal Server Error');
		}
	}
}
