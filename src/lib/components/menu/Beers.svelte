<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import MenuContainer from './MenuContainer.svelte';

	// Define a prop to accept the beer menu data
	export let beerMenu: any[];

	// Extract the `item` array from the first element in `beerMenu`
	let items = beerMenu?.[0]?.data?.item || [];
</script>

<MenuContainer>
	<!-- Render the beer items with the beer color indicator and out-of-stock styling -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each items as item}
			<div use:animateOnScroll class="flex items-start min-h-64 md:min-h-44">
				<!-- Beer Color Indicator (Circle) -->
				{#if item.beer_color}
					<div class="h-full w-8" style="background-color: {item.beer_color};"></div>
				{:else}
					<!-- Placeholder circle if no beer color is defined -->
                     <div class="h-full w-8 bg-gray-300"></div>

				{/if}

				<!-- Beer Information Section -->
				<div class="flex-1  p-4">
					<!-- Apply conditional class for out_of_stock -->
					<div class="flex justify-between gap-2">
						<h3
							class="text-xl font-semibold {item.out_of_stock ? 'line-through text-red-500' : ''}"
						>
							{item.label}
						</h3>
						<!-- Pricing Information -->
						<div class="flex items-center text-lg gap-2 h-fit">
							<small class="font-medium text-gray-800 {item.out_of_stock ? 'text-black/25' : ''}">
								${item.price_glass}
							</small>
							{#if item.price_pint != null}
								<span>|</span>
								<small class="font-medium text-gray-800 {item.out_of_stock ? 'text-black/25' : ''}">
									${item.price_pint}
								</small>
							{/if}
						</div>
					</div>
					<p class="text-gray-600 {item.out_of_stock ? 'text-black/25' : ''}">
						{item.beer_description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</MenuContainer>
