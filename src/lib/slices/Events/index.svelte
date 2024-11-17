<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	export let slice: any;

	const initialLocale = $page.url.pathname.split('/')[1].slice(0, 2);
</script>

<section
	class="mb-20 md:mb-32 grid"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="flex justify-center text-left lg:w-1/2">
		<h2 class="text-4xl lg:text-7xl text-background mb-6 font-bold tracking-wide uppercase">Connectez-vous</h2>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full py-10">
		<div class="flex flex-col items-center gap-10 border-2 border-gold-second border-opacity-30 rounded-3xl py-8">
			<h3 class="text-4xl">Google Calendar</h3>
			<a
				class="drop-shadow h-fit aspect-square rounded-full overflow-hidden"
				target="_blank"
				href={`https://calendar.google.com/calendar/u/0/embed?src=c_53ae943b843333bab36d9e11a63a0f18d3770bcd4a4a9e8fc63765ecc7a94d29@group.calendar.google.com&ctz=America/Toronto&pli=1&hl=${initialLocale}`}
			>
				<Icon class="w-40 h-40" icon="logos:google-calendar" />
			</a>
			<p class="px-4 text-center text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis corrupti laboriosam asperiores quo beatae eius atque.</p>
		</div>
		<div class="flex flex-col items-center gap-10 border-2 border-gold-second border-opacity-30 rounded-3xl py-8">
			<h3 class="text-4xl">Instagram</h3>
			<a
				class="drop-shadow h-fit aspect-square rounded-full overflow-hidden"
				target="_blank"
				href={`https://calendar.google.com/calendar/u/0/embed?src=c_53ae943b843333bab36d9e11a63a0f18d3770bcd4a4a9e8fc63765ecc7a94d29@group.calendar.google.com&ctz=America/Toronto&pli=1&hl=${initialLocale}`}
			>
				<Icon class="w-40 h-40" icon="skill-icons:instagram" />
			</a>
			<p class="px-4 text-center text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis corrupti laboriosam asperiores quo beatae eius atque.</p>
		</div>
		<div class="flex flex-col items-center gap-10 border-2 border-gold-second border-opacity-30 rounded-3xl py-8">
			<h3 class="text-4xl">Facebook</h3>
			<a
				class="drop-shadow h-fit aspect-square rounded-full overflow-hidden"
				target="_blank"
				href={`https://calendar.google.com/calendar/u/0/embed?src=c_53ae943b843333bab36d9e11a63a0f18d3770bcd4a4a9e8fc63765ecc7a94d29@group.calendar.google.com&ctz=America/Toronto&pli=1&hl=${initialLocale}`}
			>
				<Icon class="w-40 h-40" icon="logos:facebook" />
			</a>
			<p class="px-4 text-center text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis corrupti laboriosam asperiores quo beatae eius atque.</p>
		</div>
	</div>
</section>
