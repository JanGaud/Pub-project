<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	export let slice: Content.AboutSlice;
</script>

<section
	use:animateOnScroll
	id={slice.primary.section_id}
	class="text-left grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 md:mb-32 items-center"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="lg:col-span-1">
		<h2 class="text-4xl mb-6 font-bold tracking-wide uppercase">{slice.primary.title}</h2>
		<p>{slice.primary.desciption}</p>
	</div>
	<div
		class="flex justify-center items-center w-full h-auto lg:col-span-1 overflow-hidden shadow-md"
	>
		<PrismicImage class="w-full h-auto object-contain" field={slice.primary.logo} />
	</div>
</section>
