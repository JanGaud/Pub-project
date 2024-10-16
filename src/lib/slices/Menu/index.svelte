<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { Content } from '@prismicio/client';

	// Import menu components
	import Food from '$lib/components/menu/Food.svelte';
	import Cocktails from '$lib/components/menu/Cocktails.svelte';
	import Beers from '$lib/components/menu/Beers.svelte';
	import Specials from '$lib/components/menu/Specials.svelte';
	import { PrismicImage } from '@prismicio/svelte';

	// Props for Prismic slice content
	export let slice: Content.MenuSlice;

	// Access the `menu` and `flavors` data from the global store
	let menu = $page.data.menu;
	let flavors = $page.data.flavors;

	// Group cocktails by flavor type
	let cocktailsByFlavor = flavors.map((flavor: { id: any }) => {
		// Find all cocktails that match this flavor type
		const matchingCocktails =
			menu.cocktail?.[0]?.data?.item?.filter(
				(cocktail: { flavor_type: { id: any } }) => cocktail.flavor_type?.id === flavor.id
			) || [];

		return {
			...flavor,
			cocktails: matchingCocktails
		};
	});

	console.log('Cocktails by Flavor:', cocktailsByFlavor);

	// Store to track the currently selected section
	let selectedSection = writable(Object.keys(menu)[0]); // Default to the first section

	// Generate navigation items based on menu data
	let navItems = Object.entries(menu).map(([key, value]) => ({
		type: key,
		title: (value as any)[0]?.data?.title || key, // Use `title` from `data` or fallback to key
		image: (value as any)[0]?.data?.image || '' // Use `image` from `data` or empty string
	}));

	// Function to update the selected section when a navigation item is clicked
	function selectSection(sectionType: string) {
		selectedSection.set(sectionType);
	}

	// Determine the component to display based on the selected section
	$: currentMenuComponent = (() => {
		switch ($selectedSection) {
			case 'food':
				return Food;
			case 'beer':
				return Beers;
			case 'cocktail':
				return Cocktails;
			case 'specials':
				return Specials;
			default:
				return Food;
		}
	})();
</script>

<!-- Tailwind CSS Styles for navigation and menu -->
<section
	class="mb-48 mt-2"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Navigation bar with Tailwind styles -->
	<nav class="relative grid grid-cols-2 lg:grid-cols-4 items-center gap-2 md:gap-4 mb-8">
		{#each navItems as navItem}
			<button
				class="relative h-28 uppercase rounded-lg w-full overflow-hidden flex items-center justify-center gap-4 p-4 shadow-lg transition-all
				hover:shadow-inner hover:text-gold active:bg-opacity-50
				{navItem.type === $selectedSection
					? 'bg-opacity-60 text-gold underline'
					: 'bg-opacity-40 text-white'}"
				on:click={() => selectSection(navItem.type)}
			>
				<!-- PrismicImage as background -->
				{#if navItem.image}
					<PrismicImage
						field={navItem.image}
						alt={navItem.title}
						class="absolute w-full h-full object-cover z-0"
					/>
				{/if}

				<!-- Optional overlay for darkening or adding opacity over the image -->
				<div class="absolute inset-0 bg-black bg-opacity-70 z-10 pointer-events-none"></div>
				<span class="relative z-20 text-md md:text-xl lg:text-2xl text-center font-medium"
					>{navItem.title}</span
				>
			</button>
		{/each}
	</nav>

	<div class="p-4">
		<svelte:component
			this={currentMenuComponent}
			foodMenu={menu.food}
			beerMenu={menu.beer}
			cocktailMenu={menu.cocktail}
			flavors={cocktailsByFlavor}
			specialsMenu={menu.specials}
		/>
	</div>

	<nav class="relative grid grid-cols-2 lg:grid-cols-4 items-center gap-2 md:gap-4 mb-4">
		{#each navItems as navItem}
			<button
				class="relative rounded-lg shadow-md bg-background border h-16 text-sm w-full overflow-hidden flex items-center justify-center gap-4 p-4 transition-all
				 hover:text-gold active:bg-opacity-50
				{navItem.type === $selectedSection ? ' text-gold underline' : ' text-white'}"
				on:click={() => selectSection(navItem.type)}
			>
				<span class="relative z-20 text-lg text-center font-medium"
					>{navItem.title}</span
				>
			</button>
		{/each}
	</nav>
</section>
