<script>
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { PrismicLink, PrismicImage } from '@prismicio/svelte';

	const footer = $page.data.footer.data;
	const social = $page.data.settings.data.social_media || [];
	const prismicLinks = $page.data.nav.data.link || [];
	const openingHours = $page.data.openingHours[0].data.day || [];

	console.log(openingHours);
</script>

<footer class="bg-background flex flex-col items-center -mt-36 px-1 lg:px-4">
	<div
		class="px-4 py-12 grid lg:grid-cols-3 justify-center items-center gap-y-8 lg:gap-y-0 gap-x-4 w-full"
	>
		<div class="w-full flex justify-around lg:justify-start">
			<a
				href="/"
				class="z-50 border border-gold rounded-full shadow-md w-[125px] h-auto object-contain"
			>
				<PrismicImage field={footer.logo} class="w-full h-full" />
			</a>
		</div>

		<!-- Opening hours section -->
		<div class="flex flex-col items-center space-y-4">
			<h3 class="text-gold tracking-wider uppercase text-lg font-bold drop-shadow-lg">
				Heures d'ouverture
			</h3>
			<ul class="text-center">
				{#each openingHours as item}
					<li class="text-white text-[14px] tracking-wide">
						<span class="text-gold uppercase">{item.title}:</span>
						{item.hours}
					</li>
				{/each}
			</ul>
		</div>
		<!-- Social media section -->
		<div class="flex justify-center lg:justify-end space-x-6">
			{#each social as item}
				<div class="border shadow-lg border-gold rounded-full h-fit p-1 flex items-center">
					<PrismicLink field={item.link}>
						<Icon icon={item.icon} class="w-8 h-8 text-gold" />
					</PrismicLink>
				</div>
			{/each}
		</div>
	</div>

	<!-- Footer policy section -->
	<div
		class="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center border-t py-1 text-gold-second w-full"
	>
		<p class="py-1 text-base lg:w-[500px] text-center lg:text-left">
			{footer.policy}
		</p>
		<nav class="w-full lg:w-auto hidden lg:block">
			<ul
				class="flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-2 lg:space-y-0 lg:space-x-6"
			>
				{#each prismicLinks as item}
					<li class="hover:text-gold duration-200">
						<PrismicLink field={item.link}>
							{item.label}
						</PrismicLink>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
