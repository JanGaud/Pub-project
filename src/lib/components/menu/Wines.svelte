<!-- src/lib/components/menu/Wines.svelte -->
<script lang="ts">
	import MenuContainer from "./MenuContainer.svelte";

	// Define a prop to accept the wine menu data
	export let wineMenu: any[];

    	// Extract the `item` array from the first element in `wineMenu`
	let items = wineMenu?.[0]?.data?.item || [];
</script>

<MenuContainer>
	{#each items as item}
		<div class="p-4 border rounded-lg bg-white shadow-md">
			<h3 class="text-xl font-semibold">{item.label}</h3>
			<p class="text-gray-600">{item.description}</p>
			<p class="font-medium text-gray-800">${item.price} / ${item.price_bottle}</p>
		</div>
	{/each}
</MenuContainer>