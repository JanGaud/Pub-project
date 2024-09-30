<script lang="ts">
	import { page } from '$app/stores';
	import { writable, get } from 'svelte/store';
	import type { Content } from '@prismicio/client';
	import Icon from '@iconify/svelte';

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

	// Function to get menu items based on the currently selected section
	function getMenuItems() {
		// Use `get` to access the current value of `selectedSection`
		return menu[get(selectedSection)]?.[0]?.data?.item || [];
	}
</script>

<!-- Tailwind CSS Styles for navigation and menu -->
<section class="mb-48 mt-2" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<!-- Navigation bar with Tailwind styles -->
	<nav class="grid grid-cols-4 items-center gap-2 md:gap-4 mb-8">
		{#each navItems as navItem}
			<button
				class="h-16 aspect-square md:h-24 md:w-full md:aspect-auto bg-background rounded-full text-white flex items-center justify-center gap-4 p-4 shadow-lg hover:bg-gold hover:shadow-inner hover:text-black transition-all"
				on:click={() => selectSection(navItem.type)}
			>
				<!-- Display the icon and title for each navigation item -->
				<Icon class=" min-w-[40px] text-[50px] md:text-[75px]" icon={navItem.icon} />
				<span class="text-lg lg:text-xl text-center font-medium hidden lg:block">{navItem.title}</span>
			</button>
		{/each}
	</nav>
</section>
