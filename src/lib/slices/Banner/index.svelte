<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	export let slice: Content.BannerSlice;

	const currentSlide = writable(0);
	$: slideCount = slice?.primary?.slide?.length || 0;

	function goToSlide(index: number) {
		currentSlide.set(index);
	}

	function handleKeyPress(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			goToSlide(index);
		}
	}

	const autoSlideInterval = setInterval(() => {
		currentSlide.update((n) => (n + 1) % slideCount);
	}, 10000);

	onDestroy(() => {
		clearInterval(autoSlideInterval);
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="relative overflow-hidden h-screen max-h-[800px] -mx-2 md:-mx-20 -my-36 mb-20 md:mb-32"
>
	{#if slice.primary.slide && slideCount > 0}
		<div
			class="flex transition-transform duration-500 h-full"
			style="transform: translateX(calc(-100% * {$currentSlide}));"
		>
			{#each slice.primary.slide as slide, index}
				<div class="relative min-w-full h-full">
					<PrismicImage field={slide.hero_image} class="w-full h-full object-cover" />
				</div>
			{/each}
		</div>

		<!-- Title and Slogan Overlay -->
		<div class="flex justify-center items-center">
			<hgroup
				class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center"
			>
				<div class="text-left p-4 sm:p-6 md:p-8">
					<h1
						class="drop-shadow text-transparent text-4xl md:text-5xl lg:text-8xl font-semibold font-secondary tracking-widest uppercase mb-4 bg-clip-text bg-gradient-to-r from-gold via-[#E6DFC6] to-gold"
					>
						{slice.primary.title}
					</h1>

					<h2 class="drop-shadow text-white tracking-wider text-2xl md:text-3xl">
						{slice.primary.slogan}
					</h2>
					<PrismicLink
						field={slice.primary.cta[0]?.link}
						class="mt-6 shadow-xl flex items-center gap-4 w-fit border-4 uppercase backdrop-blur border-gold-second hover:border-gold duration-200 p-4"
						>{slice.primary.cta[0]?.label}
						<Icon
							class="w-6 h-6"
							icon="material-symbols-light:restaurant"/></PrismicLink>
				</div>
			</hgroup>
		</div>

		<!-- Navigation bubbles -->
		<div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex z-20">
			{#each slice.primary.slide as _, index}
				<button
					class="cursor-pointer bg-white rounded-full mx-2 w-10 h-1 focus:outline-none"
					class:opacity-80={index === $currentSlide}
					class:opacity-50={index !== $currentSlide}
					on:click={() => goToSlide(index)}
					on:keypress={(event) => handleKeyPress(event, index)}
					tabindex="0"
				></button>
			{/each}
		</div>
	{/if}
</section>
