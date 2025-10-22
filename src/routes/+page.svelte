<svelte:head>
	<title>Genshin Certification</title>
	<meta name="description" content="Generate your Genshin Impact Certification PDF!" />
</svelte:head>

<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Certificate from '$lib/components/Certificate.svelte';
	import { fetchProfiles } from '../api/profile';
	import { v4 as uuidv4 } from 'uuid';

	let uid: string = $state('');
	// certificate props
	let certName = $state('John Doe');
	let certAchievement = $state('Genshin Certification');
	let certDate = $state(new Date().toLocaleDateString());
	let certIssuer = $state('HoyoVerse');
	let certId = $state('');

	let certEl: HTMLElement;
	let htmlToImage: any;
	let jsPDF: any;

	onMount(async () => {
		// dynamic import to avoid SSR issues
		const mod = await import('html-to-image');
		htmlToImage = mod;
		jsPDF = (await import('jspdf')).default;
	});

	async function getCertified() {
		try {
			const profile = await fetchProfiles(uid);
			// map profile fields to cert props (adjust to your API shape)
			certName = profile?.nickname ?? `UID ${uid}`;
			certId = `CERT-${uuidv4().split('-')[0].toUpperCase()}`;
			certAchievement = 'Genshin Certification';
			certIssuer = 'HoyoVerse';
			certDate = new Date().toLocaleDateString();

            profile?.spiralAbyssFloor == 12 && profile?.spiralAbyssFloorChamber == 3
                ? certAchievement += '<br /> Completed Spiral Abyss Floor 12'
                : null;
            
			if(profile?.stygianIndex == 5) {
                certAchievement += '<br /> Achieved Stygian Onslaught Rank 5 in ' + profile?.stygianSeconds + ' seconds';
            }else if(profile?.stygianIndex == 6) {
                certAchievement += '<br /> Achieved Stygian Onslaught 6(Hardcore) in ' + profile?.stygianSeconds + ' seconds';
            }

			// wait for DOM to update with new props
			await tick();

			// MOVE element on-screen temporarily for capture
			certEl.style.position = 'fixed';
			certEl.style.top = '0';
			certEl.style.left = '0';
			certEl.style.zIndex = '-1'; // behind everything but visible to renderer

			// wait for fonts/images/styles to fully load
			await new Promise((resolve) => setTimeout(resolve, 500));

			if (!htmlToImage || !jsPDF) {
				alert('Export libraries not loaded yet — try again in a moment.');
				return;
			}

			// capture certificate element as PNG
			const dataUrl = await htmlToImage.toPng(certEl, {
				pixelRatio: 2,
				cacheBust: true,
				backgroundColor: '#ffffff'
			});

			// hide it again
			certEl.style.position = 'absolute';
			certEl.style.left = '-9999px';

			// create PDF in A4 landscape (297mm x 210mm), scale image to fit
			const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
			const pdfWidth = 297; // A4 landscape width in mm
			const pdfHeight = 210; // A4 landscape height in mm
			pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
			pdf.save(`${certId}.pdf`);
		} catch (err) {
			console.error(err);
			alert('Failed to generate certificate PDF');
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
	<h1 class="mb-6 text-4xl font-bold">Genshin Certification</h1>
	<input
		type="text"
		placeholder="Input your UID"
		name="uid"
		bind:value={uid}
		class="w-64 rounded-md border border-gray-300 p-2"
	/>

	<button
		onclick={getCertified}
		class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
	>
		GET CERTIFIED
	</button>
</div>

<!-- Off-screen certificate for PDF generation (A4 landscape: 1123x794px at 96 DPI) -->
<div
	bind:this={certEl}
	style="position:absolute; left:-9999px;"
>
	<Certificate name={certName} achievement={certAchievement} date={certDate} issuer={certIssuer} />
</div>
