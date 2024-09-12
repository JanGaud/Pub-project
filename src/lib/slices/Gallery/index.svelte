<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.GallerySlice;
</script>

<section
	class="-mx-2 md:-mx-20 min-h-[600px]"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Main Image -->
	<div class="relative w-full h-[400px] mb-8">
		<PrismicImage field={slice.primary.image} class="w-full h-96 object-cover" />
	</div>

	<!-- Thumbnail Images -->
	<div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4">
		{#each slice.primary.thumbnail as item}
			<div class="w-full aspect-square overflow-hidden">
				<PrismicImage field={item.image} class="w-full h-full object-cover" />
			</div>
		{/each}
	</div>
</section>
