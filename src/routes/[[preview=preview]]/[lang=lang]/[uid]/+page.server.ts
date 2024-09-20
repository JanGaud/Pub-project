import { error } from '@sveltejs/kit';
import { asText } from '@prismicio/client';

import { createClient } from '$lib/prismicio';

// @ts-ignore
export async function load({ fetch, cookies, params }) {
	const client = createClient({ fetch, cookies });

	try {
		const page = await client.getByUID('page', 'home', {
			lang: params.lang
		});

		return {
			page,
			title: asText(page.data.title),
			meta_description: page.data.meta_description,
			meta_title: page.data.meta_title,
			meta_image: page.data.meta_image.url
		};
	} catch (err) {
		error(404, String(err));
	}
}