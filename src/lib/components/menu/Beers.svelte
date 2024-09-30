<!-- src/lib/components/menu/Beers.svelte -->
<script lang="ts">
	import MenuContainer from "./MenuContainer.svelte";

	// Define a prop to accept the beer menu data
	export let beerMenu: any[];

	// Extract the `item` array from the first element in `beerMenu`
	let items = beerMenu?.[0]?.data?.item || [];
</script>

<MenuContainer>
	{#each items as item}
		<div class="p-4 border rounded-lg bg-white shadow-md">
			<h3 class="text-xl font-semibold">{item.label}</h3>
			<p class="text-gray-600">{item.beer_description}</p>
			<p class="font-medium text-gray-800">${item.price_glass} / ${item.price_pint}</p>
		</div>
	{/each}
</MenuContainer>
