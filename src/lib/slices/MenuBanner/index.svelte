<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { page } from '$app/stores';

	export let slice: Content.MenuBannerSlice;

	// Access the specials item data from the menu
	let specials = $page.data.menu.specials[0].data.item;

	// Track the current slide index for the carousel
	let currentSlideIndex = 0;
	let interval: ReturnType<typeof setInterval> | undefined;

	// Helper function to clear the existing interval and restart it
	function resetInterval() {
		if (interval) clearInterval(interval);
		if (specials.length > 1) {
			interval = setInterval(showNextSlide, 5000); // Restart the interval
		}
	}

	// Navigate to the previous slide in the carousel
	function showPreviousSlide() {
		if (currentSlideIndex > 0) {
			currentSlideIndex--;
		} else {
			currentSlideIndex = specials.length - 1;
		}
		resetInterval(); // Reset interval when navigating manually
	}

	// Navigate to the next slide in the carousel
	function showNextSlide() {
		if (currentSlideIndex < specials.length - 1) {
			currentSlideIndex++;
		} else {
			currentSlideIndex = 0;
		}
		resetInterval(); // Reset interval when navigating manually
	}

	// Automatically switch the slide every 5 seconds, only if there's more than 1 promo
	onMount(() => {
		if (specials.length > 1) {
			interval = setInterval(showNextSlide, 5000);
		}
		return () => {
			if (interval) clearInterval(interval); // Clear the interval when the component is destroyed
		};
	});
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="relative overflow-hidden h-[450px] -mx-2 md:-mx-20 -my-36 mb-20 md:mb-0">
		<div
			class="absolute inset-0 grid md:grid-cols-2 gap-4 lg:gap-10 items-center bg-black bg-opacity-80 text-white text-center"
		>
			<!-- Static Title and Subtitle Section -->
			<div class="mt-24 px-4 sm:px-10 lg:px-24 text-left">
				<h1
					class="drop-shadow text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-secondary tracking-widest uppercase mb-4 bg-clip-text bg-gradient-to-r from-gold via-[#E6DFC6] to-gold"
				>
					{slice.primary.title}
				</h1>

				<h2 class="drop-shadow text-white tracking-wider text-md">
					{slice.primary.description}
				</h2>
			</div>

			{#if specials.length > 0}
				<!-- Carousel Section -->
				<div
					class="mt-24 px-4 sm:px-16 lg:px-24 hidden md:flex justify-center items-center relative"
				>
					<!-- Left Arrow, visible only when more than one promo -->
					{#if specials.length > 1}
						<button
							class="absolute left-4 lg:left-16 z-10 text-white text-6xl hover:text-gold duration-200 p-2 rounded-full"
							aria-label="Previous Slide"
							on:click={showPreviousSlide}
						>
							‹
						</button>
					{/if}

					<!-- Inner Carousel Container -->
					<div
						class="bg-[#00000046] backdrop-blur-md rounded-lg w-full min-h-[250px] flex flex-col justify-center items-center p-4"
					>
						<h3 class="text-white text-2xl mb-2 font-bold">
							{specials[currentSlideIndex]?.title}
						</h3>
						<p class="text-white text-md">{specials[currentSlideIndex]?.description}</p>
					</div>

					<!-- Right Arrow, visible only when more than one promo -->
					{#if specials.length > 1}
						<button
							class="absolute right-4 lg:right-16 z-10 text-white text-6xl hover:text-gold duration-200 p-2 rounded-full"
							aria-label="Next Slide"
							on:click={showNextSlide}
						>
							›
						</button>
					{/if}
				</div>
			{/if}
		</div>

		<PrismicImage field={slice.primary.image} class="w-full h-full object-cover" />
	</div>

	{#if specials.length > 0}
		<!-- Mobile Carousel Section -->
		<div class="-mt-32 p-4 h-fit flex justify-center items-center relative overflow-hidden md:hidden">
			<!-- Left Arrow, visible only when more than one promo -->
			{#if specials.length > 1}
				<button
					class="absolute left-2 lg:left-16 z-10 text-black text-7xl active:text-gold duration-200 p-2 rounded-full"
					aria-label="Previous Slide"
					on:click={showPreviousSlide}
				>
					‹
				</button>
			{/if}

			<!-- Inner Carousel Container -->
			<div
				class="bg-[#0000007e] px-8 backdrop-blur-md rounded-lg w-full h-[325px] flex flex-col justify-center items-center p-4"
			>
				<h3 class="text-white drop-shadow-md text-2xl mb-2 font-bold">
					{specials[currentSlideIndex]?.title}
				</h3>
				<p class="text-white text-md drop-shadow">
					{specials[currentSlideIndex]?.description}
				</p>
			</div>

			<!-- Right Arrow, visible only when more than one promo -->
			{#if specials.length > 1}
				<button
					class="absolute right-2 lg:right-16 z-10 text-black text-7xl active:text-gold duration-200 p-2 rounded-full"
					aria-label="Next Slide"
					on:click={showNextSlide}
				>
					›
				</button>
			{/if}
		</div>
	{/if}
</section>
