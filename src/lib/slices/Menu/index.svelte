<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { Content } from '@prismicio/client';
	import Icon from '@iconify/svelte';

	// Import menu components
	import Food from '$lib/components/menu/Food.svelte';
	import Cocktails from '$lib/components/menu/Cocktails.svelte';
	import Beers from '$lib/components/menu/Beers.svelte';
	import Wines from '$lib/components/menu/Wines.svelte';

	// Props for Prismic slice content
	export let slice: Content.MenuSlice;

	// Access the `menu` data from the global store
	let menu = $page.data.menu;

	// Store to track the currently selected section
	let selectedSection = writable(Object.keys(menu)[0]); // Default to the first section

	// Generate navigation items based on menu data
	let navItems = Object.entries(menu).map(([key, value]) => ({
		type: key,
		title: (value as any)[0]?.data?.title || key, // Use `title` from `data` or fallback to key
		icon: (value as any)[0]?.data?.icon || '' // Use `icon` from `data` or empty string
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
			case 'wine':
				return Wines;
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
	<nav
		class="grid grid-cols-2 lg:grid-cols-4 items-center gap-2 md:gap-4 mb-8"
	>
		{#each navItems as navItem}
			<button
				class="h-28 rounded-lg w-full md:aspect-auto flex items-center justify-center gap-4 p-4 shadow-lg transition-all
				hover:bg-gold hover:shadow-inner hover:text-black active:bg-gold
				{navItem.type === $selectedSection
					? 'bg-gold text-black shadow-inner'
					: 'bg-background text-white'}"
				on:click={() => selectSection(navItem.type)}
			>
				<!-- Display the icon and title for each navigation item -->
				<span class="text-md md:text-xl lg:text-2xl text-center font-medium">{navItem.title}</span>
			</button>
		{/each}
	</nav>

	<!-- Display the content of the currently selected menu section -->
	<div class="p-4">
		<!-- Dynamic component rendering based on the selected menu section -->
		<svelte:component
			this={currentMenuComponent}
			foodMenu={menu.food}
			beerMenu={menu.beer}
			cocktailMenu={menu.cocktail}
			wineMenu={menu.wine}
		/>
	</div>
</section>
