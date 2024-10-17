<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import Icon from '@iconify/svelte';
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
					<div use:animateOnScroll class="flex w-full gap-2 border-b">
						<div class="flex flex-col justify-between w-full">
							<!-- Apply conditional class for out_of_stock -->
							<div class="flex justify-between gap-2">
								<h3
									class="text-xl font-semibold {item.out_of_stock
										? 'line-through text-red-500'
										: ''}"
								>
									{item.label}
								</h3>
								<div class="flex items-center text-lg gap-2 h-fit">
									<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}"
										>${item.price}</small
									>
									{#if item.price_variant != null}
										<span>|</span>
										<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}"
											>${item.price_variant}</small
										>
									{/if}
									{#if item.price_variant_2 != null}
										<span>|</span>
										<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}"
											>${item.price_variant_2}</small
										>
									{/if}
								</div>
							</div>
							{#if item.ingredients}
								<p class={item.out_of_stock ? 'text-black/25' : ''}>{item.ingredients}</p>
							{/if}
							<!-- Display boolean attributes as images if true -->
							<div class="flex gap-3 my-2">
								{#if item.vegan}
									<img src="/dietaryTag/vegan.png" alt="Vegan" class="w-10 h-10" />
								{/if}
								{#if item.vegetarian}
									<img src="/dietaryTag/vegetarian.png" alt="Vegetarian" class="w-10 h-10" />
								{/if}
								{#if item.spicy}
									<img src="/dietaryTag/red-chili-pepper.png" alt="Spicy" class="w-9 h-9" />
								{/if}
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Right Column: Main Items -->
		<div class="flex flex-col gap-4 p-2 md:p-4">
			{#if mainItems.length > 0}
				{#each mainItems as item}
					<div use:animateOnScroll class="flex w-full gap-2 border-b">
						<div class="flex flex-col justify-between w-full">
							<!-- Apply conditional class for out_of_stock -->
							<div class="flex justify-between gap-2">
								<h3
									class="text-xl font-semibold {item.out_of_stock
										? 'line-through text-red-500'
										: ''}"
								>
									{item.label}
								</h3>
								<div class="flex items-center text-lg gap-2 h-fit">
									<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}"
										>${item.price}</small
									>
									{#if item.price_variant != null}
										<span>|</span>
										<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}"
											>${item.price_variant}</small
										>
									{/if}
								</div>
							</div>
							{#if item.ingredients}
								<p class={item.out_of_stock ? 'text-black/25' : ''}>{item.ingredients}</p>
							{/if}
							<!-- Display boolean attributes as images if true -->
							<div class="flex gap-3 my-2">
								{#if item.vegan}
									<img src="/dietaryTag/vegan.png" alt="Vegan" class="w-10 h-10" />
								{/if}
								{#if item.vegetarian}
									<img src="/dietaryTag/vegetarian.png" alt="Vegetarian" class="w-10 h-10" />
								{/if}
								{#if item.spicy}
									<img src="/dietaryTag/red-chili-pepper.png" alt="Spicy" class="w-9 h-9" />
								{/if}
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</MenuContainer>
