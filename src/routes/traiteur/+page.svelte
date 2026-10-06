<script>
	import { onMount } from 'svelte';

	let heroVideo;
	let heroMuted = true;

	onMount(() => {
		// Browsers only autoplay muted video; make sure it starts.
		if (heroVideo) {
			heroVideo.muted = true;
			heroVideo.play().catch(() => {});
		}
	});

	let form = { name: '', email: '', phone: '', date: '', guests: '', message: '', website: '' };
	let status = 'idle'; // idle | sending | sent | error
	let errorMsg = '';

	async function submitRequest() {
		if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
			status = 'error';
			errorMsg = 'Merci de remplir votre nom, votre courriel et un message.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
			status = 'error';
			errorMsg = 'Merci d\'entrer une adresse courriel valide.';
			return;
		}
		status = 'sending';
		try {
			const res = await fetch('/api/traiteur', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});
			if (!res.ok) throw new Error();
			status = 'sent';
			form = { name: '', email: '', phone: '', date: '', guests: '', message: '', website: '' };
		} catch {
			status = 'error';
			errorMsg = "L'envoi n'a pas fonctionné. Réessayez ou écrivez-nous à evenements100genies@gmail.com.";
		}
	}

	function toggleHeroSound() {
		heroMuted = !heroMuted;
		heroVideo.muted = heroMuted;
		if (!heroMuted) heroVideo.play().catch(() => {});
	}
</script>

<svelte:head>
	<title>Traiteurs 100 Limites : Service traiteur | 100 Génies</title>
	<meta
		name="description"
		content="Service traiteur du 100 Génies : bouchées et plateaux à partager pour vos réceptions, 5 à 7 et événements corporatifs."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- LAYOUT LOCKED: full-bleed, do not add wrapping container/max-width/margin here — see CLAUDE.md -->
<div class="traiteur-page -mx-2 md:-mx-20" style="background: #0c0b0a; overflow-x: clip;">
	<header
		style="position: sticky; top: 0; z-index: 20; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px clamp(20px, 5vw, 64px); background: rgba(12,11,10,0.82); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(245,241,234,0.09);"
	>
		<div style="display: flex; align-items: center; gap: 14px;">
			<a href="/" aria-label="Retour au 100 Génies" style="display: flex; align-items: center; flex: none;">
				<img
					src="/circleLogo.png"
					alt="100 Génies"
					width="40"
					height="40"
					style="width: 40px; height: 40px; border-radius: 50%; display: block;"
				/>
			</a>
			<span
				style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; letter-spacing: 0.02em; color: #f5f1ea;"
				>Traiteurs 100 Limites</span
			>
		</div>
		<nav style="display: flex; align-items: center; gap: clamp(14px, 2.4vw, 34px);">
			<a
				href="#menu"
				class="nav-link"
				style="font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #cfc8bd;"
				>Menu</a
			>
			<a
				href="#galerie"
				class="nav-link"
				style="font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #cfc8bd;"
				>Galerie</a
			>
			<a
				href="#demande"
				class="nav-cta"
				style="padding: 10px 18px; border: 1px solid #d9a44c; border-radius: 999px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: #d9a44c;"
				>Faire une demande</a
			>
		</nav>
	</header>

	<section
		style="position: relative; min-height: min(92vh, 900px); display: grid; align-items: start; align-content: space-between; row-gap: 32px; padding: clamp(40px, 8vw, 110px) clamp(20px, 5vw, 64px) clamp(16px, 3vw, 32px);"
	>
		<!-- Hero video: autoplays muted (browser rule); the button lets visitors turn the sound on -->
		<video
			bind:this={heroVideo}
			src="/traiteur/bouchee-hero.mp4"
			autoplay
			muted
			loop
			playsinline
			preload="auto"
			style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%;"
		></video>
		<div
			style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(9,8,7,0.5) 0%, rgba(9,8,7,0) 65%), linear-gradient(to bottom, rgba(9,8,7,0.8) 0%, rgba(9,8,7,0.4) 45%, rgba(9,8,7,0.1) 75%, rgba(9,8,7,0.3) 100%);"
		></div>
		<button
			type="button"
			class="sound-toggle"
			on:click={toggleHeroSound}
			aria-pressed={!heroMuted}
			aria-label={heroMuted ? 'Activer le son de la vidéo' : 'Couper le son de la vidéo'}
			style="position: absolute; right: clamp(16px, 5vw, 64px); bottom: clamp(16px, 3vw, 32px); z-index: 2; display: inline-flex; align-items: center; gap: 10px; padding: 11px 18px; border: 1px solid rgba(245,241,234,0.35); border-radius: 999px; background: rgba(12,11,10,0.55); backdrop-filter: blur(8px); color: #f5f1ea; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; transition: all .2s ease;"
		>
			{#if heroMuted}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
				<span class="sound-label">Activer le son</span>
			{:else}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
				<span class="sound-label">Couper le son</span>
			{/if}
		</button>
		<div style="position: relative; max-width: 980px;">
			<h1
				style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: clamp(34px, 6.6vw, 96px); line-height: 1.02; letter-spacing: -0.015em; color: #fbf8f2; white-space: nowrap;"
			>
				Traiteurs 100 Limites
			</h1>
			<p
				style="margin: 24px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-weight: 500; font-size: clamp(24px, 3.2vw, 42px); line-height: 1.2; color: #d9a44c;"
			>
				Des saveurs sans limites.
			</p>
			<p
				style="margin: 18px 0 0; max-width: 620px; font-size: clamp(16px, 1.5vw, 20px); line-height: 1.6; font-weight: 300; color: #ddd6c9;"
			>
				Bouchées et plateaux à partager pour vos réceptions, 5 à 7 et événements corporatifs.
			</p>
			<p
				style="margin: 14px 0 0; font-size: 13px; letter-spacing: 0.04em; color: #ddd6c9; text-shadow: 0 1px 8px rgba(0,0,0,0.6);"
			>
				Sur place ou hors site
			</p>
			<a href="#demande" class="hero-cta" style="margin-top: 26px;">
				Faire une demande <span class="hero-cta-arrow" aria-hidden="true">→</span>
			</a>
		</div>
	</section>

	<section style="background: #f7f4ef; color: #17150f; padding: clamp(56px, 9vw, 130px) clamp(20px, 5vw, 64px);">
		<div
			style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(32px, 5vw, 72px); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));"
		>
			<div>
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #a07524;"
					>Ce que nous offrons</span
				>
				<h2
					style="margin: 18px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 3.6vw, 52px); line-height: 1.08; letter-spacing: -0.01em;"
				>
					Un service traiteur flexible et gourmand.
				</h2>
				<div style="display: grid; gap: 0; margin-top: 32px; max-width: 460px;">
					{#each ['Bouchées', 'Buffets et repas de groupe', 'Plateaux à partager', 'Menus personnalisés selon votre événement', 'Service de bar et options boissons, au besoin', 'Formules clé en main : nourriture, service et ambiance'] as item, i}
						<div
							style="display: flex; gap: 14px; align-items: baseline; padding: 13px 0; border-top: 1px solid rgba(23,21,15,0.12);{i === 5
								? ' border-bottom: 1px solid rgba(23,21,15,0.12);'
								: ''}"
						>
							<span style="width: 5px; height: 5px; border-radius: 50%; background: #a07524; flex: none;"
							></span>
							<span style="font-size: 15.5px; line-height: 1.5; color: #29251d;">{item}</span>
						</div>
					{/each}
				</div>
			</div>
			<div>
				<p style="margin: 0; font-size: clamp(16px, 1.35vw, 19px); line-height: 1.75; font-weight: 300; color: #3b362c;">
					Un service traiteur flexible et gourmand, conçu pour transformer vos rassemblements en
					événements mémorables. Nous adaptons notre offre à votre occasion, à votre groupe et à votre
					budget.
				</p>
				<p
					style="margin: 20px 0 0; font-size: clamp(16px, 1.35vw, 19px); line-height: 1.75; font-weight: 300; color: #3b362c;"
				>
					Menus qui varient selon la saison, flexibles sur les demandes spéciales, avec options
					végétariennes, véganes et sans gluten.
				</p>
				<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px;">
					{#each ['Végétarien', 'Végane', 'Sans gluten'] as tag}
						<span
							style="padding: 9px 16px; border: 1px solid rgba(23,21,15,0.16); border-radius: 999px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #4a4437;"
							>{tag}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section style="background: #100e0c; padding: clamp(56px, 9vw, 120px) clamp(20px, 5vw, 64px);">
		<div style="max-width: 1180px; margin: 0 auto;">
			<div
				style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px;"
			>
				<div>
					<span
						style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #d9a44c;"
						>Pour quels événements ?</span
					>
					<h2
						style="margin: 18px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 4vw, 56px); line-height: 1.05; color: #fbf8f2;"
					>
						Particuliers, entreprises<br />et organisateurs.
					</h2>
				</div>
				<p style="margin: 0; max-width: 300px; font-size: 14.5px; line-height: 1.7; color: #9d9689;">
					De la fête de famille au lancement corporatif : on ajuste le menu, les quantités et le
					service.
				</p>
			</div>
			<div
				class="event-grid"
				style="margin-top: clamp(32px, 4.5vw, 56px); display: grid; gap: 14px;"
			>
				{#each [['01', "Anniversaires, fêtes privées et célébrations familiales"], ['02', 'Mariages, fiançailles et repas de répétition'], ['03', "Réunions d'équipe, lunchs corporatifs et événements de bureau"], ['04', 'Partys de Noël et autres partys saisonniers'], ['05', 'Cocktails, 5 à 7, réseautage et événements-bénéfice'], ['06', 'Événements communautaires, culturels ou sportifs']] as [num, text]}
					<div class="event-card" style="padding: 26px 24px; border: 1px solid rgba(245,241,234,0.11); border-radius: 4px; transition: all .25s ease;">
						<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #d9a44c;"
							>{num}</span
						>
						<p style="margin: 14px 0 0; font-size: 16px; line-height: 1.55; color: #eae4d8;">{text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="menu" style="background: #fdfcfa; color: #17150f; padding: clamp(56px, 9vw, 130px) clamp(20px, 5vw, 64px);">
		<div style="max-width: 1180px; margin: 0 auto;">
			<div
				style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid rgba(23,21,15,0.14);"
			>
				<h2
					style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(32px, 4.4vw, 64px); line-height: 1;"
				>
					Aperçu du <em style="font-style: italic; color: #a07524;">Menu</em>
				</h2>
				<p
					style="margin: 0; max-width: 340px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; line-height: 1.7; color: #6e6656;"
				>
					Tarifs et disponibilité sur demande : menu sujet à changement selon la saison.
				</p>
			</div>

			<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; align-items: baseline; gap: 16px;">
				<h3
					style="margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #17150f;"
				>
					Bouchées froides
				</h3>
				<span style="flex: 1; height: 1px; background: rgba(23,21,15,0.12);"></span>
			</div>
			<div
				style="margin-top: 26px; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(272px, 1fr));"
			>
				{#each [['Bruschetta', 'Tomates, oignon rouge et basilic', 'bruschetta'], ['Tartare de thon', 'Oignon vert, échalote et poivre noir', 'tartare-thon'], ['Roulés de saumon fumé', 'Ruban de concombre et aneth', 'roules-saumon']] as [title, desc, photo]}
					<article class="menu-card" style="padding: 26px; border: 1px solid rgba(23,21,15,0.1); border-radius: 4px; background: #fff; transition: all .25s ease;">
						<img src="/traiteur/{photo}-800.webp" srcset="/traiteur/{photo}-800.webp 800w, /traiteur/{photo}-1600.webp 1600w" sizes="(max-width: 700px) 100vw, 400px" alt={title} loading="lazy" decoding="async" style="display: block; width: calc(100% + 52px); max-width: none; height: 210px; margin: -26px -26px 22px; object-fit: cover;" />
						<h4
							style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: 25px; line-height: 1.2;"
						>
							{title}
						</h4>
						<p style="margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #6b6353;">{desc}</p>
					</article>
				{/each}
			</div>

			<div style="margin-top: clamp(44px, 6vw, 80px); display: flex; align-items: baseline; gap: 16px;">
				<h3
					style="margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #17150f;"
				>
					Bouchées chaudes
				</h3>
				<span style="flex: 1; height: 1px; background: rgba(23,21,15,0.12);"></span>
			</div>
			<div
				style="margin-top: 26px; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));"
			>
				{#each [['Bouchées de poulet épicé', 'Marinade aux épices et persil', 'poulet-epice'], ['Dumplings', 'Sauce teriyaki et sésame noir', 'dumplings-teriyaki'], ['Chaussons feuilletés', 'Servis avec sauce trempette', 'chaussons-sauce'], ['Mini mac & cheese', 'Parmesan, poivre noir et persil', 'mac-cheese']] as [title, desc, photo]}
					<article class="menu-card" style="padding: 26px; border: 1px solid rgba(23,21,15,0.1); border-radius: 4px; background: #fff; transition: all .25s ease;">
						<img src="/traiteur/{photo}-800.webp" srcset="/traiteur/{photo}-800.webp 800w, /traiteur/{photo}-1600.webp 1600w" sizes="(max-width: 700px) 100vw, 400px" alt={title} loading="lazy" decoding="async" style="display: block; width: calc(100% + 52px); max-width: none; height: 210px; margin: -26px -26px 22px; object-fit: cover;" />
						<h4
							style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: 25px; line-height: 1.2;"
						>
							{title}
						</h4>
						<p style="margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #6b6353;">{desc}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section id="galerie" style="background: #100e0c; padding: clamp(56px, 9vw, 120px) clamp(20px, 5vw, 64px);">
		<div style="max-width: 1180px; margin: 0 auto;">
			<div style="display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 18px;">
				<h2
					style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 4vw, 56px); color: #fbf8f2;"
				>
					La table, en images
				</h2>
				
			</div>
			<div
				style="margin-top: clamp(28px, 4vw, 48px); display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); grid-auto-rows: minmax(190px, auto); grid-auto-flow: dense;"
			>
				{#each [['table-salon', 'Assortiment de bouchées sur une table de salon', 240], ['trio-terrasse', 'Roulés de saumon, tartare de thon et bouchées en terrasse', 190], ['mac-cheese-terrasse', 'Mini mac & cheese en terrasse', 190], ['plateau-bar', 'Plateau de bouchées au bar', 190]] as [photo, alt, minH]}
					<div class="gallery-tile" style="min-height: {minH}px; position: relative; overflow: hidden; background: #1e1a14; transition: filter .3s ease;">
						<img src="/traiteur/{photo}-800.webp" srcset="/traiteur/{photo}-800.webp 800w, /traiteur/{photo}-1600.webp 1600w" sizes="(max-width: 700px) 100vw, 400px" {alt} loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section style="background: #f7f4ef; color: #17150f; padding: clamp(56px, 9vw, 120px) clamp(20px, 5vw, 64px);">
		<div style="max-width: 1180px; margin: 0 auto;">
			<h2
				style="margin: 0 0 clamp(28px, 4vw, 48px); font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 4vw, 56px);"
			>
				Bon à savoir
			</h2>
			<div
				style="display: grid; gap: 1px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); background: rgba(23,21,15,0.14);"
			>
				<div style="background: #f7f4ef; padding: 30px 26px 30px 0;">
					<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #a07524;">01</span>
					<h3 style="margin: 14px 0 8px; font-size: 17px; font-weight: 600; letter-spacing: 0.01em;">
						Préavis d'environ 10 jours
					</h3>
					<p style="margin: 0; font-size: 14.5px; line-height: 1.65; color: #5d5648;">
						Recommandé pour garantir la disponibilité de la cuisine.
					</p>
				</div>
				<div style="background: #f7f4ef; padding: 30px 26px;">
					<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #a07524;">02</span>
					<h3 style="margin: 14px 0 8px; font-size: 17px; font-weight: 600;">Quantités minimales</h3>
					<p style="margin: 0; font-size: 14.5px; line-height: 1.65; color: #5d5648;">
						Variables selon le type d'événement.
					</p>
				</div>
				<div style="background: #f7f4ef; padding: 30px 26px;">
					<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #a07524;">03</span>
					<h3 style="margin: 14px 0 8px; font-size: 17px; font-weight: 600;">Demandes spéciales</h3>
					<p style="margin: 0; font-size: 14.5px; line-height: 1.65; color: #5d5648;">
						Allergies, restrictions, formats : on s'adapte.
					</p>
				</div>
				<div style="background: #f7f4ef; padding: 30px 0 30px 26px;">
					<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #a07524;">04</span>
					<h3 style="margin: 14px 0 8px; font-size: 17px; font-weight: 600;">Menu saisonnier</h3>
					<p style="margin: 0; font-size: 14.5px; line-height: 1.65; color: #5d5648;">
						Le menu varie à chaque saison selon les produits.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section style="background: #fdfcfa; color: #17150f; padding: clamp(56px, 9vw, 120px) clamp(20px, 5vw, 64px);">
		<div
			style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(28px, 4vw, 56px); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center;"
		>
			<div>
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #a07524;"
					>Sur place ou ailleurs</span
				>
				<h2
					style="margin: 18px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 3.8vw, 54px); line-height: 1.06;"
				>
					Recevez au 100 Génies, ou laissez-nous venir à vous.
				</h2>
				<p
					style="margin: 22px 0 0; max-width: 480px; font-size: clamp(16px, 1.3vw, 18px); line-height: 1.75; font-weight: 300; color: #3b362c;"
				>
					Notre équipe peut offrir le service sur place au pub ou dans un lieu de votre choix, selon
					vos besoins.
				</p>
				<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px;">
					<span
						style="padding: 10px 18px; background: #17150f; border-radius: 999px; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #f0e7d5;"
						>Sur place au pub</span
					>
					<span
						style="padding: 10px 18px; border: 1px solid rgba(23,21,15,0.18); border-radius: 999px; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #4a4437;"
						>Hors site</span
					>
				</div>
			</div>
			<div style="min-height: 340px; position: relative; overflow: hidden; border-radius: 4px;">
				<img src="/traiteur/plateau-salle-1600.webp" srcset="/traiteur/plateau-salle-800.webp 800w, /traiteur/plateau-salle-1600.webp 1600w" sizes="(max-width: 700px) 100vw, 580px" alt="Bouchées servies dans la salle du 100 Génies" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
			</div>
		</div>
	</section>

	<section id="demande" style="background: #0c0b0a; padding: clamp(56px, 9vw, 130px) clamp(20px, 5vw, 64px);">
		<div
			style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(34px, 5vw, 72px); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: start;"
		>
			<div>
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #d9a44c;"
					>Réservations</span
				>
				<h2
					style="margin: 18px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(32px, 4.4vw, 60px); line-height: 1.05; color: #fbf8f2;"
				>
					Faire une <em style="font-style: italic; color: #d9a44c;">demande</em>
				</h2>
				<p
					style="margin: 22px 0 0; max-width: 420px; font-size: 16px; line-height: 1.7; font-weight: 300; color: #b8b1a3;"
				>
					Vous avez une idée d'événement ? Écrivez-nous pour discuter de votre groupe, de la date et
					du type de menu souhaité.
				</p>
				<p style="margin: 30px 0 0; font-size: 15px; line-height: 1.7; color: #b8b1a3;">
					Ou contactez Dylan directement à<br /><a
						href="mailto:evenements100genies@gmail.com"
						style="color: #d9a44c; text-decoration: none; border-bottom: 1px solid rgba(217,164,76,0.4);"
						>evenements100genies@gmail.com</a
					>
				</p>
			</div>
			<form
				on:submit|preventDefault={submitRequest}
				novalidate
				style="position: relative; display: grid; gap: 18px; padding: clamp(24px, 3vw, 40px); background: #14120f; border: 1px solid rgba(245,241,234,0.1); border-radius: 6px;"
			>
				<div style="display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
					<label
						style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
					>
						Nom
						<input
							type="text"
							placeholder="Prénom et nom" name="name" required autocomplete="name" bind:value={form.name}
							class="form-field"
							style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; letter-spacing: 0; text-transform: none;"
						/>
					</label>
					<label
						style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
					>
						Courriel
						<input
							type="email"
							placeholder="vous@exemple.com" name="email" required autocomplete="email" bind:value={form.email}
							class="form-field"
							style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; letter-spacing: 0; text-transform: none;"
						/>
					</label>
					<label
						style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
					>
						Téléphone
						<input
							type="tel"
							placeholder="(514) 000-0000" name="phone" autocomplete="tel" bind:value={form.phone}
							class="form-field"
							style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; letter-spacing: 0; text-transform: none;"
						/>
					</label>
					<label
						style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
					>
						Date de l'événement
						<input
							type="text"
							placeholder="JJ / MM / AAAA" name="date" bind:value={form.date}
							class="form-field"
							style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; letter-spacing: 0; text-transform: none;"
						/>
					</label>
				</div>
				<label
					style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
				>
					Nombre d'invités
					<input
						type="text"
						placeholder="ex. 60" name="guests" inputmode="numeric" bind:value={form.guests}
						class="form-field"
						style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; letter-spacing: 0; text-transform: none;"
					/>
				</label>
				<label
					style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
				>
					Message
					<textarea
						rows="4"
						placeholder="Type d'événement, allergies, demandes spéciales…" name="message" required bind:value={form.message}
						class="form-field"
						style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; line-height: 1.6; letter-spacing: 0; text-transform: none; resize: vertical;"
					></textarea>
				</label>
				<!-- honeypot: hidden from people, catches spam bots -->
				<input type="text" name="website" bind:value={form.website} tabindex="-1" autocomplete="off" aria-hidden="true" style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;" />
				<button
					type="submit"
					disabled={status === 'sending'}
					class="submit-btn"
					style="margin-top: 6px; padding: 17px 26px; border: none; border-radius: 999px; background: #d9a44c; color: #14120f; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; cursor: pointer; transition: all .2s ease;"
				>
					{status === 'sending' ? 'Envoi en cours…' : 'Envoyer la demande'}
				</button>
				{#if status === 'sent'}
					<p role="status" style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #d9a44c;">Merci ! Votre demande a bien été envoyée. Nous vous répondrons sous peu.</p>
				{:else if status === 'error'}
					<p role="alert" style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #e58a6f;">{errorMsg}</p>
				{/if}
			</form>
		</div>
	</section>

	<footer
		style="background: #080706; border-top: 1px solid rgba(245,241,234,0.09); padding: clamp(44px, 6vw, 80px) clamp(20px, 5vw, 64px) 34px;"
	>
		<div
			style="max-width: 1180px; margin: 0 auto; display: grid; gap: 36px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));"
		>
			<div>
				<div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; color: #f5f1ea;">
					Traiteurs 100 Limites
				</div>
				<div
					style="margin-top: 6px; font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 16px; color: #d9a44c;"
				>
					Des saveurs sans limites
				</div>
				<p style="margin: 16px 0 0; font-size: 14.5px; line-height: 1.7; color: #8d867a;">
					Au 100 Génies<br />530 rue Peel<br />Montréal, QC H3C 2H1
				</p>
			</div>
			<div>
				<div style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #6f695d;">
					Traiteur
				</div>
				<div style="display: grid; gap: 10px; margin-top: 16px;">
					<a href="#menu" class="footer-link" style="font-size: 14.5px; color: #cfc8bd;">Aperçu du menu</a>
					<a href="#galerie" class="footer-link" style="font-size: 14.5px; color: #cfc8bd;">Galerie</a>
					<a href="#demande" class="footer-link" style="font-size: 14.5px; color: #cfc8bd;"
						>Faire une demande</a
					>
				</div>
			</div>
			<div>
				<div style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #6f695d;">
					Suivez-nous
				</div>
				<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px;">
					<a
						href="#"
						class="social-link"
						style="padding: 9px 16px; border: 1px solid rgba(245,241,234,0.16); border-radius: 999px; font-size: 13px; color: #cfc8bd;"
						>Instagram</a
					>
					<a
						href="#"
						class="social-link"
						style="padding: 9px 16px; border: 1px solid rgba(245,241,234,0.16); border-radius: 999px; font-size: 13px; color: #cfc8bd;"
						>Facebook</a
					>
				</div>
			</div>
			<div>
				<div style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #6f695d;">
					Contact
				</div>
				<div style="display: grid; gap: 10px; margin-top: 16px;">
					<a
						href="mailto:evenements100genies@gmail.com"
						class="footer-link"
						style="font-size: 14.5px; color: #cfc8bd; word-break: break-all;">evenements100genies@gmail.com</a
					>
					<a href="/" class="footer-link" style="font-size: 14.5px; color: #cfc8bd;">Site principal ↗</a>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	.traiteur-page {
		color: #f5f1ea;
		font-family: 'Manrope', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	.traiteur-page :global(a) {
		text-decoration: none;
	}

	.traiteur-page :global(input),
	.traiteur-page :global(textarea),
	.traiteur-page :global(button) {
		font-family: inherit;
	}

	.nav-link:hover {
		color: #d9a44c;
	}

	.nav-cta:hover {
		background: #d9a44c;
		color: #14120f;
	}

	/* Hero CTA: large, transparent, gold outline with a steady white glow */
	.hero-cta {
		display: inline-flex;
		align-items: center;
		gap: clamp(10px, 1vw, 16px);
		padding: clamp(16px, 1.6vw, 22px) clamp(28px, 2.8vw, 40px);
		border: 2px solid #d9a44c;
		border-radius: 999px;
		background: rgba(12, 11, 10, 0.15);
		color: #d9a44c;
		font-size: clamp(17px, 1.4vw, 20px);
		font-weight: 700;
		letter-spacing: 0.02em;
		text-shadow: 0 0 12px rgba(255, 255, 255, 0.175);
		box-shadow:
			0 0 18px rgba(255, 255, 255, 0.225),
			0 0 42px rgba(255, 255, 255, 0.1),
			inset 0 0 14px rgba(255, 255, 255, 0.075);
		transition: all 0.25s ease;
	}

	.hero-cta-arrow {
		font-size: 1.15em;
		transition: transform 0.25s ease;
	}



	.hero-cta:hover {
		background: #d9a44c;
		color: #14120f;
		text-shadow: none;
		box-shadow:
			0 0 30px rgba(255, 255, 255, 0.275),
			0 0 70px rgba(255, 255, 255, 0.125);
	}

	.hero-cta:hover .hero-cta-arrow {
		transform: translateX(4px);
	}


	.sound-toggle:hover {
		border-color: #d9a44c;
		color: #d9a44c;
	}

	.hero-cta:active {
		background: #c08e38;
		border-color: #c08e38;
	}

	.event-grid {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 900px) {
		.event-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.event-grid {
			grid-template-columns: 1fr;
		}
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: wait;
	}

	.event-card:hover {
		border-color: rgba(217, 164, 76, 0.6);
		background: #16130f;
	}

	.menu-card:hover {
		border-color: #d9a44c;
		box-shadow: 0 22px 46px -30px rgba(23, 21, 15, 0.45);
		transform: translateY(-3px);
	}

	.gallery-tile:hover {
		filter: brightness(1.08);
	}

	.form-field {
		outline: none;
	}

	.form-field:focus {
		border-color: #d9a44c;
		box-shadow: 0 0 0 3px rgba(217, 164, 76, 0.15);
	}

	.submit-btn:hover {
		background: #f0c885;
	}

	.submit-btn:active {
		background: #c08e38;
		transform: translateY(1px);
	}

	.footer-link:hover {
		color: #d9a44c;
	}

	.social-link:hover {
		border-color: #d9a44c;
		color: #d9a44c;
	}
</style>
