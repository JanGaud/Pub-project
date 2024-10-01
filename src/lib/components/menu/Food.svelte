<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import MenuContainer from './MenuContainer.svelte';

	// Define a prop to accept the food menu data structure
	export let foodMenu: any[];

	// Extract the `item` array from the first element in `foodMenu`
	let items = foodMenu?.[0]?.data?.item || [];

	// Separate the items into two categories based on `appetizer` property
	let appetizerItems = items.filter((item: { appetizer: boolean }) => item.appetizer === true);
	let mainItems = items.filter((item: { appetizer: boolean }) => item.appetizer === false);
</script>

<!-- Render items in two columns using Tailwind CSS -->
<MenuContainer>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Left Column: Appetizers -->
		<div class="flex flex-col gap-4 p-2 md:p-4 bg-gold bg-opacity-25">
			{#if appetizerItems.length > 0}
				{#each appetizerItems as item}
					<div use:animateOnScroll class="flex gap-2">
						<div>
							<!-- Apply conditional class for out_of_stock -->
							<div class="flex justify-between gap-2">
								<h3
									class="text-xl font-semibold {item.out_of_stock
										? 'line-through text-red-500'
										: ''}"
								>
									{item.title}
								</h3>
								<div class="flex items-center text-lg gap-2 h-fit">
									<small
										class="font-medium text-gray-800 {item.out_of_stock ? 'text-black/25' : ''}"
										>${item.price}</small
									>
									{#if item.price_variant != null}
										<span>|</span>
										<small
											class="font-medium text-gray-800 {item.out_of_stock ? 'text-black/25' : ''}"
											>${item.price_variant}</small
										>
									{/if}
								</div>
							</div>
							<p class="text-gray-600 {item.out_of_stock ? 'text-black/25' : ''}">
								{item.ingredients}
							</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Right Column: Main Items -->
		<div class="flex flex-col gap-4 p-2 md:p-4">
			{#if mainItems.length > 0}
				{#each mainItems as item}
					<div use:animateOnScroll class="flex gap-2">
						<div>
							<!-- Apply conditional class for out_of_stock -->
							<div class="flex justify-between gap-2">
								<h3
									class="text-xl font-semibold {item.out_of_stock
										? 'line-through text-red-500'
										: ''}"
								>
									{item.title}
								</h3>
								<div class="flex items-center text-lg gap-2 h-fit">
									<small
										class="font-medium text-gray-800 {item.out_of_stock ? 'text-black/25' : ''}"
										>${item.price}</small
									>
									{#if item.price_variant != null}
										<span>|</span>
										<small
											class="font-medium text-gray-800 {item.out_of_stock ? 'text-black/25' : ''}"
											>${item.price_variant}</small
										>
									{/if}
								</div>
							</div>
							<p class="text-gray-600 {item.out_of_stock ? 'text-black/25' : ''}">
								{item.ingredients}
							</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</MenuContainer>
