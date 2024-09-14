<script lang="ts">
	import { onMount } from 'svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import frLocale from '@fullcalendar/core/locales/fr'; // Import only the French locale
	import { PrismicImage } from '@prismicio/svelte'; // Import PrismicImage for optimized images

	export let slice: any;

	// Reactive variable for selected event details
	let selectedEvent: {
		extendedProps: any;
		title: any;
		description: any;
		start?: any;
		end?: any;
	} | null = null;
	let eventIndex = 0;
	let intervalId: NodeJS.Timeout;

	// Function to map your event data to FullCalendar's format
	const mapEventsToCalendarFormat = (events: any[]) => {
		const currentDate = new Date(); // Get the current date
		return events
			.map((event) => {
				const startDate = new Date(event.date);
				const endDate = new Date(event.date_end);

				return {
					title: event.title,
					start: event.date,
					end: event.date_end,
					description: event.description,
					extendedProps: {
						thumbnail: event.thum, // Use the whole thumbnail object for PrismicImage
						altText: event.thum.alt, // Extra property to store alt text
						startTime: `${startDate.toLocaleDateString([], {
							weekday: 'short', // e.g., Mon
							year: 'numeric',
							month: 'short', // e.g., Sep
							day: 'numeric'
						})} ${startDate.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}`, // Format date and time for start
						endTime: `${endDate.toLocaleDateString([], {
							weekday: 'short',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})} ${endDate.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}` // Format date and time for end
					}
				};
			})
			.filter((event) => new Date(event.start) >= currentDate); // Filter to only show upcoming events
	};

	// Map the event data for the calendar and the carousel
	const events = mapEventsToCalendarFormat(slice.primary.event);

	// Function to update the selected event for the carousel
	const updateSelectedEvent = () => {
		selectedEvent = events[eventIndex];
		eventIndex = (eventIndex + 1) % events.length; // Loop back to the first event after the last one
	};

	const startCarousel = () => {
		if (intervalId) clearInterval(intervalId); // Clear any existing intervals
		intervalId = setInterval(updateSelectedEvent, 10000); // Restart the interval
	};

	onMount(() => {
		const calendarEl = document.getElementById('calendar');

		if (calendarEl) {
			const calendar = new Calendar(calendarEl, {
				plugins: [dayGridPlugin],
				initialView: 'dayGridMonth',
				locales: [frLocale],
				locale: 'fr',
				events: events, // Add the mapped events here
				displayEventTime: false, // Hide the time part in the calendar view to reduce clutter
				eventContent: function (info) {
					// Custom rendering for events to display start and end times
					const startTime = info.event.extendedProps.startTime;
					const endTime = info.event.extendedProps.endTime;
					const eventTitle = info.event.title;
					return {
						html: `<div class='bg-white shadow p-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap'>
                      <span class='block text-sm font-semibold text-gray-800 truncate'>${eventTitle}</span>
                      <span class='block text-xs text-gray-600'>${startTime} - ${endTime}</span>
                   </div>`
					};
				},
				eventClick: function (info) {
					// Manually select the event when clicked
					clearInterval(intervalId); // Stop the automatic carousel
					selectedEvent = {
						title: info.event.title,
						description: info.event.extendedProps.description,
						extendedProps: {
							thumbnail: info.event.extendedProps.thumbnail,
							altText: info.event.extendedProps.altText,
							startTime: info.event.extendedProps.startTime,
							endTime: info.event.extendedProps.endTime
						}
					};
					eventIndex = events.findIndex((e) => e.title === info.event.title); // Update index to the clicked event
					startCarousel(); // Restart the carousel from the selected event
				}
			});
			calendar.render();
		}

		// Start the automatic carousel from the first event
		if (events.length > 0) {
			selectedEvent = events[0]; // Start with the first upcoming event
			startCarousel(); // Start the carousel from the beginning
		}

		return () => {
			clearInterval(intervalId); // Clean up on component unmount
		};
	});
</script>

<section
	use:animateOnScroll
	class="mb-32"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<h2
		class="text-center text-3xl sm:text-4xl lg:text-7xl drop-shadow-md uppercase tracking-widest mb-10"
	>
		{slice.primary.title}
	</h2>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
		<!-- Event Details Section with Background Image -->
		<div class="relative order-1 lg:order-2 bg-background w-full h-[500px] p-4 overflow-hidden">
			{#if selectedEvent}
				<!-- Wrapper for Zoom-In and Fade Effect -->
				<div class="absolute inset-0 w-full h-full z-0 overflow-hidden fade-zoom-animation">
					<!-- Add animation class that restarts with each image -->
					<div class="w-full h-full">
						<PrismicImage
							class="w-full h-full object-cover"
							field={selectedEvent.extendedProps.thumbnail}
						/>
					</div>
				</div>
				<!-- Event Details Overlay at the Bottom -->
				<div
					class="absolute bottom-0 left-0 right-0 z-10 text-white p-4 bg-[#00000084] backdrop-blur-sm transition-opacity duration-1000 ease-in-out"
				>
					<h2 class="text-2xl font-semibold mb-2 text-white">{selectedEvent.title}</h2>
					<p class="text-sm mb-2">{selectedEvent.description}</p>
					<p class="text-sm">
						{selectedEvent.extendedProps.startTime} - {selectedEvent.extendedProps.endTime}
					</p>
				</div>
			{/if}
		</div>

		<!-- Calendar Section -->
		<div class="w-full order-2 lg:order-1">
			<div id="calendar"></div>
		</div>
	</div>
</section>

<style>
	/* Tailwind is applied to the rest, so only necessary custom styles are defined here */
	.fc .fc-toolbar {
		@apply flex items-center justify-between p-4;
	}

	.fc .fc-today-button,
	.fc .fc-prev-button,
	.fc .fc-next-button {
		@apply bg-blue-600 text-white rounded px-3 py-1 mx-1 cursor-pointer hover:bg-blue-700 transition;
	}

	.fc .fc-today-button:disabled {
		@apply bg-gray-300 text-gray-500 cursor-not-allowed;
	}

	.fc .fc-daygrid-day {
		@apply border border-gray-200;
	}

	.fc .fc-daygrid-day.fc-day-today {
		@apply bg-blue-50;
	}

	.fc .fc-daygrid-day-events {
		@apply flex flex-col items-center justify-center;
	}

	.fc-event {
		@apply block overflow-hidden whitespace-nowrap text-ellipsis;
	}

	/* Smooth Zoom-In and Fade Effect */
	.fade-zoom-animation {
		animation: zoomAndFade 10s ease-in-out infinite;
	}

	@keyframes zoomAndFade {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		85% {
			transform: scale(1.1);
			opacity: 1;
		}
		95% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: scale(1.1);
		}
	}
</style>
