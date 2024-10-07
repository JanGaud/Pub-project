<!-- src/lib/components/menu/Wines.svelte -->
<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import MenuContainer from './MenuContainer.svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	// Define a prop to accept the wine menu data
	export let specialsMenu: any[] = [];

	// Extract the `item` array from the first element in `specialsMenu`
	let items = specialsMenu?.[0]?.data?.item || [];

	// Track the current center index
	let currentCenterIndex = 0;

	// Navigate to the next item
	function showNextItem() {
		if (currentCenterIndex < items.length - 1) {
			currentCenterIndex++;
		} else {
			currentCenterIndex = 0; // Loop back to the first item
		}
	}

	// Navigate to the previous item
	function showPreviousItem() {
		if (currentCenterIndex > 0) {
			currentCenterIndex--;
		} else {
			currentCenterIndex = items.length - 1; // Loop back to the last item
		}
	}

	// Function to get the CSS class for each item based on its position
	function getPositionClass(index: number) {
		if (index === currentCenterIndex) {
			return 'center';
		} else if (index === (currentCenterIndex - 1 + items.length) % items.length) {
			return 'left';
		} else if (index === (currentCenterIndex + 1) % items.length) {
			return 'right';
		}
		return '';
	}

	// Function to calculate the translateX value for each item
	function calculateTranslateX(index: number) {
		let position = index - currentCenterIndex;
		if (position > Math.floor(items.length / 2)) {
			position -= items.length;
		} else if (position < -Math.floor(items.length / 2)) {
			position += items.length;
		}
		return position * 100; // Adjust the multiplier for spacing
	}
</script>

<section class="flex flex-col gap-4 items-center">
	{#each items as item, i}
		{#if item.affiche}
			<div class="w-full md:w-[500px]">
				<PrismicImage field={item.affiche} />
			</div>
		{/if}
	{/each}
</section>
