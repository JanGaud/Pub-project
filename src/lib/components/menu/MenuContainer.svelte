<div
	class="parallax-bg shadow-inner py-4 lg:p-2 bg-cover bg-center bg-no-repeat overflow-hidden"
	style="background-image: url('/white-wood-bg.png');"
>
	<slot></slot>
</div>

<style>
	.parallax-bg {
		background-attachment: scroll;
		background-position: center;
		background-size: cover;
		position: relative;
	}

	.parallax-bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: inherit;
		background-size: cover;
		background-position: 50% 0;
		z-index: -1;
		transform: translateY(-30%); /* Increase the parallax shift */
		will-change: transform;
		transition: transform 0.3s ease-out; /* Faster transition */
	}

	.parallax-bg:hover::before {
		transform: translateY(0%); /* Moves the background fully into place on hover */
	}
</style>
