<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import MenuContainer from './MenuContainer.svelte';

	// Define a prop to accept the cocktail menu data structure
	export let cocktailMenu: any[] = [];

	// Define a prop to accept the flavors structure, each containing its cocktails
	export let flavors: any[] = [];

	// Use the `flavors` array to separate the cocktails into groups by flavor type
	let alcoholicItemsByFlavor = flavors.filter((flavor) => flavor.cocktails.length > 0);
	let nonAlcoholicItems =
		cocktailMenu?.[0]?.data?.item?.filter((item: { soft: boolean }) => item.soft === true) || [];
</script>

<!-- Render items in two columns using Tailwind CSS -->
<MenuContainer>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Loop through each type of alcoholic flavor and put each in a separate grid cell -->
		{#each alcoholicItemsByFlavor as flavor}
			<div use:animateOnScroll class="bg-[#ffffff8e] backdrop-blur-md shadow-md">
				<div>
					<!-- Flavor Type Header with Background Color -->
					<div class="p-2" style="background: linear-gradient(to bottom, {flavor.data.color || '#f0f0f0'}, transparent);">
						<h2 class="text-2xl font-semibold uppercase">{flavor.data.title}</h2>
						<p class="text-sm mb-4">{flavor.data.description}</p>
					</div>
					
					<!-- Cocktails under each flavor -->
					<div class="flex flex-col gap-4 mt-2 md:mt-4 px-4 pb-4">
						{#each flavor.cocktails as item}
							<!-- Each item container uses w-full to occupy full width -->
							<div class="flex w-full">
								<div class="flex flex-col justify-between w-full">
									<!-- Header with drink name and price -->
									<div class="flex justify-between items-start">
										<h3 class="text-xl font-semibold {item.out_of_stock ? 'line-through text-red-500' : ''}">
											{item.label}
										</h3>
										<div class="flex items-center text-lg gap-2 h-fit">
											<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
												${item.price}
											</small>
											{#if item.price_pitcher != null}
												<span>|</span>
												<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
													${item.price_pitcher}
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
					</div>
				</div>
			</div>
		{/each}

		<!-- Last Box: Non-Alcoholic Cocktails -->
		<div class="flex flex-col justify-between gap-4 p-2 md:p-4 border-t bg-[#ffffff8e] backdrop-blur-md shadow-md">
			{#if nonAlcoholicItems.length > 0}
				<div use:animateOnScroll class="flex flex-col gap-4">
					{#each nonAlcoholicItems as item}
						<!-- Each item container uses w-full to occupy full width -->
						<div class="flex w-full">
							<div class="flex flex-col justify-between w-full">
								<!-- Header with drink name and price -->
								<div class="flex justify-between items-start">
									<h3 class="text-xl font-semibold {item.out_of_stock ? 'line-through text-red-500' : ''}">
										{item.label}
									</h3>
									<div class="flex items-center text-lg gap-2 h-fit">
										<small class="font-medium {item.out_of_stock ? 'text-black/25' : ''}">
											${item.price}
										</small>
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
			<div class="flex justify-center text-center border shadow-sm p-2">
				<small>{cocktailMenu[0]?.data?.notes}</small>
			</div>
		</div>
	</div>
</MenuContainer>
