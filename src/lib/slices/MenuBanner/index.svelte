<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.MenuBannerSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="relative overflow-hidden h-[450px] -mx-2 md:-mx-20 -my-36 mb-20 md:mb-32"
>
	<div
		class="absolute inset-0 grid md:grid-cols-2 gap-4 lg:gap-10 items-center bg-black bg-opacity-80 text-white text-center"
	>
		<div class="mt-24 px-4 sm:px-10 lg:px-24 text-left">
			<h1
				class="drop-shadow text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-secondary tracking-widest uppercase mb-4 bg-clip-text bg-gradient-to-r from-gold via-white to-gold"
			>
				{slice.primary.title}
			</h1>

			<h2 class="drop-shadow text-white tracking-wider text-md">
				{slice.primary.description}
			</h2>
		</div>
		<div class="mt-24 px-4 sm:px-16 lg:px-24 hidden md:flex justify-center items-center">
			<div class="bg-[#00000046] backdrop-blur-md rounded-lg w-full h-[250px]"></div>
		</div>
	</div>
	<PrismicImage field={slice.primary.image} class="w-full h-full object-cover" />
</section>
