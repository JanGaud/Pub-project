import { NotFoundError, asText } from '@prismicio/client';
import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';

type Menu = {
	food?: any;
	beer?: any;
	cocktail?: any;
	wine?: any;
};

// @ts-ignore
export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });
	let menu: Menu = {};

	try {
		// Fetch the page data based on the UID
		const page = await client.getByUID('page', params.uid, {
			lang: params.lang || 'fr-ca'
		});

		if (!page) {
			throw error(404, 'Page not found');
		}

		// Fetch food data
		try {
			menu.food = await client.getAllByType('food');
		} catch (fetchError) {
			console.error('Failed to fetch food data from Prismic:', fetchError);
			menu.food = null;
		}

		// Fetch beer data
		try {
			menu.beer = await client.getAllByType('beer');
		} catch (fetchError) {
			console.error('Failed to fetch beer data from Prismic:', fetchError);
			menu.beer = null;
		}

		// Fetch cocktail data
		try {
			menu.cocktail = await client.getAllByType('cocktails');
		} catch (fetchError) {
			console.error('Failed to fetch cocktail data from Prismic:', fetchError);
			menu.cocktail = null;
		}

		// Fetch wine data
		try {
			menu.wine = await client.getAllByType('wine');
		} catch (fetchError) {
			console.error('Failed to fetch wine data from Prismic:', fetchError);
			menu.wine = null;
		}

		return {
			page,
			menu,
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
