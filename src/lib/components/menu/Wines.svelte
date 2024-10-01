<!-- src/lib/components/menu/Wines.svelte -->
<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import MenuContainer from './MenuContainer.svelte';

	// Define a prop to accept the wine menu data
	export let wineMenu: any[];

	// Extract the `item` array from the first element in `wineMenu`
	let items = wineMenu?.[0]?.data?.item || [];
</script>

<MenuContainer>
	<!-- Render the beer items with the beer color indicator and out-of-stock styling -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each items as item}
			<div use:animateOnScroll class="flex items-start min-h-64 md:min-h-44">
				<!-- Beer Color Indicator (Circle) -->
				{#if item.wine_color}
					<div class="h-full w-8" style="background-color: {item.wine_color};"></div>
				{:else}
					<!-- Placeholder circle if no beer color is defined -->
					<div class="h-full w-8 bg-gray-300"></div>
				{/if}

				<!-- Beer Information Section -->
				<div class="flex-1 p-4">
					<!-- Apply conditional class for out_of_stock -->
					<div class="flex justify-between gap-2">
						<h3
							class="text-xl font-semibold {item.out_of_stock ? 'line-through text-red-500' : ''}"
						>
							{item.label}
						</h3>
						<!-- Pricing Information -->
						<div class="flex items-center text-lg gap-2 h-fit">
							{#if item.price != null}<small
									class="font-medium {item.out_of_stock ? 'text-black/25' : ''}"
								>
									${item.price}
								</small>
							{/if}
							{#if item.price != null && item.price != null}
								<span>|</span>
							{/if}
							{#if item.price_bottle != null}
								<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
									${item.price_bottle}
								</small>
							{/if}
						</div>
					</div>
					<p class="{item.out_of_stock ? 'text-black/25' : ''}">
						{item.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</MenuContainer>
