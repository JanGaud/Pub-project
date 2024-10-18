<script lang="ts">
	import { page } from '$app/stores';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	export let slice: any;

	const initialLocale = $page.url.pathname.split('/')[1].slice(0, 2);
</script>

<section
	use:animateOnScroll
	class="mb-20 md:mb-32"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div
		style="border: 5px solid #4a148c; padding: 10px; border-radius: 10px; background-color: #f0f0f0;"
	>
		<iframe
			title="Events Calendar"
			src={`https://calendar.google.com/calendar/u/0/embed?src=c_53ae943b843333bab36d9e11a63a0f18d3770bcd4a4a9e8fc63765ecc7a94d29@group.calendar.google.com&ctz=America/Toronto&pli=1&hl=${initialLocale}`}
			style="border: 0; width: 1000px; height: 800px;"
			frameborder="0"
			scrolling="no"
		></iframe>
	</div>
</section>
