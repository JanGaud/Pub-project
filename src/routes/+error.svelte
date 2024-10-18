<script>
	import { page } from '$app/stores';
	import { PrismicLink } from '@prismicio/svelte';
</script>

<section class="h-fit -mt-8 md:-mt-36">
	<div class="relative h-[350px] md:h-[500px]">
		<div class="text-center">
			<h1
				class="drop-shadow-xl text-transparent text-[175px] lg:text-[375px] font-semibold font-secondary tracking-widest uppercase mb-4 bg-clip-text bg-gradient-to-r from-gold via-[#E6DFC6] to-gold"
			>
				{$page.status}
			</h1>
		</div>
		<!-- Image container, centered horizontally -->
		<div class="absolute flex justify-center bottom-10 md:bottom-0 w-full z-10">
			<img
				class="w-[250px] md:h-full md:w-auto object-contain drop-shadow-md"
				src="/GenieBottle.png"
				alt="Genie bottle"
			/>
		</div>
	</div>
	<div class="mb-60 flex flex-col items-center gap-10">
		<div class="flex justify-around text-center">
			{#if $page.status === 404}
				<p class="text-xl md:text-2xl">
					{$page.data.page_errors.data['404']}
				</p>
			{/if}
			{#if $page.status === 500}
				<p class="text-xl md:text-2xl">{$page.data.page_errors.data['505']}</p>
			{/if}
		</div>
		<PrismicLink class="bg-background text-white shadow-xl flex items-center gap-4 w-fit border-4 uppercase backdrop-blur border-gold-second hover:border-gold duration-200 p-4" field={$page.data.page_errors.data.back_home}
			>{$page.data.page_errors.data.back_home.text}</PrismicLink>
	</div>
</section>
