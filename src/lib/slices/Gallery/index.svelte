<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.GallerySlice;
</script>

<section
	{...slice.primary.section_id && { id: slice.primary.section_id }}
	class="shadow-inner py-10 -mx-2 md:-mx-20 mb-20 md:mb-32 min-h-[600px]"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<!-- Main Image with Overlay -->
	<div class="relative w-full h-[375px] mb-8">
		<!-- Overlay with Centered Text -->
		<div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<h2 class="text-white text-center text-3xl sm:text-4xl lg:text-7xl drop-shadow-md uppercase tracking-widest">{slice.primary.title}</h2>
		</div>
		<!-- Main Image -->
		<PrismicImage field={slice.primary.image} class="w-full h-96 object-cover" />
	</div>

	<!-- Thumbnail Images -->
	<div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4">
		{#each slice.primary.thumbnail as item}
			<div class="w-full aspect-square overflow-hidden shadow-md">
				<PrismicImage field={item.image} class="w-full h-full object-cover" />
			</div>
		{/each}
	</div>
</section>
