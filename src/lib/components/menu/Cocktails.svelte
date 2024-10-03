<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import MenuContainer from './MenuContainer.svelte';

	// Define a prop to accept the cocktail menu data structure
	export let cocktailMenu: any[];

	// Safely access the items array from the cocktailMenu data
	let items = cocktailMenu?.[0]?.data?.item || [];

	// Separate the items into two categories based on `soft` property
	let nonAlcoholicItems = items.filter((item: { soft: boolean }) => item.soft === true);
	let alcoholicItems = items.filter((item: { soft: boolean }) => item.soft === false);
</script>

<!-- Render items in two columns using Tailwind CSS -->
<MenuContainer>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Left Column: Alcoholic Cocktails -->
		<div class="flex flex-col gap-4 p-2 md:p-4 bg-gold bg-opacity-25">
			{#if alcoholicItems.length > 0}
				{#each alcoholicItems as item}
					<!-- Each item container uses w-full to occupy full width -->
					<div use:animateOnScroll class="flex w-full">
						<div class="flex flex-col justify-between w-full">
							<!-- Header with drink name and price -->
							<div class="flex justify-between items-start">
								<h3
									class="text-xl font-semibold {item.out_of_stock
										? 'line-through text-red-500'
										: ''}"
								>
									{item.label}
								</h3>
								<div class="flex items-center text-lg gap-2 h-fit">
									<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
										${item.price}
									</small>
									{#if item.price_p != null}
										<span>|</span>
										<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
											${item.price_p}
										</small>
									{/if}
								</div>
							</div>
							<!-- Description or Placeholder -->
							<p class="text-sm mt-2 {item.out_of_stock ? 'text-black/25' : ''} h-full">
								{item.ingredients || 'Ingrédients non spécifiés'}
							</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Right Column: Non-Alcoholic Cocktails -->
		<div class="flex flex-col justify-between gap-4 p-2 md:p-4">
			{#if nonAlcoholicItems.length > 0}
				<div class="flex flex-col gap-4">
					{#each nonAlcoholicItems as item}
						<!-- Each item container uses w-full to occupy full width -->
						<div use:animateOnScroll class="flex w-full">
							<div class="flex flex-col justify-between w-full">
								<!-- Header with drink name and price -->
								<div class="flex justify-between items-start">
									<h3
										class="text-xl font-semibold {item.out_of_stock
											? 'line-through text-red-500'
											: ''}"
									>
										{item.label}
									</h3>
									<div class="flex items-center text-lg gap-2 h-fit">
										<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
											${item.price}
										</small>
										{#if item.price_p != null}
											<span>|</span>
											<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
												${item.price_p}
											</small>
										{/if}
									</div>
								</div>
								<!-- Description or Placeholder -->
								{#if item.ingredients}
									<p class="text-sm mt-2 {item.out_of_stock ? 'text-black/25' : ''} h-full">
										{item.ingredients || 'Ingrédients non spécifiés'}
									</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
			<div class="flex justify-center text-center border shadow-sm p-2"><small>{cocktailMenu[0].data?.notes}</small></div>
		</div>
	</div>
</MenuContainer>
