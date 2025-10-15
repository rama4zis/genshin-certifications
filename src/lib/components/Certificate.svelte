<script>
	export let name = 'John Doe';
	export let achievement = 'Stygian Onslaught';
	export let date = new Date().toLocaleDateString();
	export let issuer = 'Your Organization';

	import logo from '$lib/assets/hoyo.png';
</script>

<div
	class="relative mx-auto flex h-[794px] w-[1123px] flex-col overflow-hidden border border-gray-200 bg-white p-12 shadow-lg"
>
	<!-- Header -->
	<div class="relative z-20 text-center">
		<h1 class="mb-2 text-4xl font-light text-gray-800">Certificate</h1>
		<div class="mx-auto h-0.5 w-24 bg-gray-400"></div>
	</div>

	<!-- Content - centered vertically -->
	<div class="relative z-20 flex flex-1 flex-col justify-center space-y-8 text-center">
		<p class="text-lg text-gray-600">This is to certify that</p>

		<h2 class="inline-block  text-3xl font-semibold text-gray-900">
			{name}
		</h2>

		<p class="text-lg text-gray-600">has successfully completed</p>

		<h3 class="text-2xl font-medium text-gray-800">
			{@html achievement}
		</h3>
	</div>

	<!-- Footer - positioned at bottom -->
	<div class="relative z-20 flex items-end justify-between pt-8">
		<div class="text-left">
			<div class="mb-2 w-40 border-b border-gray-400"></div>
			<p class="text-sm text-gray-600">Date: {date}</p>
		</div>

		<div class="text-right">
			<div class="mb-2 w-40 border-b border-gray-400"></div>
			<p class="text-sm text-gray-600">{issuer}</p>
		</div>
	</div>

	<img src={logo} alt="Wave" class="absolute left-[21%] top-[8%] z-10 w-2xl text-center" />
</div>
