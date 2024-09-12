<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.AboutSlice;
</script>

<section
	class="text-left grid grid-cols-1 md:grid-cols-3 gap-10 items-center"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="md:col-span-2">
		<h2 class="text-4xl mb-6 font-bold tracking-wide">{slice.primary.title}</h2>
		<p>{slice.primary.desciption}</p>
	</div>
	<div class="flex justify-center items-center w-full h-auto md:col-span-1 overflow-hidden">
		<PrismicImage class="w-full h-auto object-contain" field={slice.primary.logo} />
	</div>
</section>

