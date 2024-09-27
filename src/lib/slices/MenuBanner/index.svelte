<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.MenuBannerSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="relative overflow-hidden h-[450px] -mx-2 md:-mx-20 -my-36 mb-20 md:mb-32">
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
			<div class="mt-24 px-4 sm:px-16 lg:px-24 hidden md:flex justify-center items-center relative">
				<!-- Left Arrow -->
				<button
					class="absolute left-4 lg:left-16 z-10 text-white text-6xl hover:text-gold duration-200 p-2 rounded-full"
					aria-label="Previous Slide"
				>
					‹
				</button>

				<!-- Inner Carousel Container -->
				<div
					class="bg-[#00000046] backdrop-blur-md rounded-lg w-full h-[250px] flex justify-center items-center"
				>
					<!-- Carousel content goes here -->
					<p class="text-white text-xl">Carousel Content</p>
				</div>

				<!-- Right Arrow -->
				<button
					class="absolute right-4 lg:right-16 z-10 text-white text-6xl hover:text-gold duration-200 p-2 rounded-full"
					aria-label="Next Slide"
				>
					›
				</button>
			</div>
		</div>
		<PrismicImage field={slice.primary.image} class="w-full h-full object-cover" />
	</div>

	<!-- visible only on mobile  -->
	<div class="-mt-32 px-2 flex justify-center items-center relative md:hidden">
		<!-- Left Arrow -->
		<button
			class="absolute left-4 lg:left-16 z-10 text-black text-6xl hover:text-gold duration-200 p-2 rounded-full"
			aria-label="Previous Slide"
		>
			‹
		</button>

		<!-- Inner Carousel Container -->
		<div
			class="bg-[#00000046] backdrop-blur-md rounded-lg w-full h-[250px] flex justify-center items-center"
		>
			<!-- Carousel content goes here -->
			<p class="text-black text-xl">Carousel Content</p>
		</div>

		<!-- Right Arrow -->
		<button
			class="absolute right-4 lg:right-16 z-10 text-black text-6xl hover:text-gold duration-200 p-2 rounded-full"
			aria-label="Next Slide"
		>
			›
		</button>
	</div>
</section>
