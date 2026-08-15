<svelte:head>
	<title>Mille et une Bouchées — Service traiteur | 100 Génies</title>
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
				>Mille et une Bouchées</span
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
		style="position: relative; min-height: min(92vh, 900px); display: grid; align-items: end; padding: clamp(40px, 8vw, 110px) clamp(20px, 5vw, 64px) clamp(40px, 6vw, 80px);"
	>
		<div
			style="position: absolute; inset: 0; background-image: repeating-linear-gradient(135deg, #26221c 0px, #26221c 12px, #1c1915 12px, #1c1915 24px); display: flex; align-items: flex-start; justify-content: flex-end; padding: clamp(74px, 9vw, 110px) clamp(20px, 5vw, 64px) 0;"
		>
			<span
				style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(217,164,76,0.55); border: 1px dashed rgba(217,164,76,0.4); padding: 8px 14px;"
				>[placeholder] photo bouchées — plein cadre</span
			>
		</div>
		<div
			style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(9,8,7,0.94) 0%, rgba(9,8,7,0.55) 48%, rgba(9,8,7,0.35) 100%);"
		></div>
		<div style="position: relative; max-width: 980px;">
			<h1
				style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: clamp(34px, 6.6vw, 96px); line-height: 1.02; letter-spacing: -0.015em; color: #fbf8f2; white-space: nowrap;"
			>
				Mille et une Bouchées
			</h1>
			<p
				style="margin: 24px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-weight: 500; font-size: clamp(24px, 3.2vw, 42px); line-height: 1.2; color: #d9a44c;"
			>
				Mille et une façons de se régaler.
			</p>
			<p
				style="margin: 18px 0 0; max-width: 620px; font-size: clamp(16px, 1.5vw, 20px); line-height: 1.6; font-weight: 300; color: #ddd6c9;"
			>
				Bouchées et plateaux à partager pour vos réceptions, 5 à 7 et événements corporatifs.
			</p>
			<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-top: 38px;">
				<span style="font-size: 13px; letter-spacing: 0.04em; color: #97907f;">Sur place ou hors site</span>
				<a
					href="#demande"
					class="hero-cta"
					style="display: inline-flex; align-items: center; gap: 12px; padding: 17px 30px; border-radius: 999px; background: #d9a44c; color: #14120f; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; box-shadow: 0 18px 40px -18px rgba(217,164,76,0.7);"
				>
					Faire une demande <span style="font-size: 17px;">→</span>
				</a>
			</div>
		</div>
	</section>

	<section style="background: #f7f4ef; color: #17150f; padding: clamp(56px, 9vw, 130px) clamp(20px, 5vw, 64px);">
		<div
			style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(32px, 5vw, 72px); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));"
		>
			<div>
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #a07524;"
					>Ce que nous offrons</span
				>
				<h2
					style="margin: 18px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 3.6vw, 52px); line-height: 1.08; letter-spacing: -0.01em;"
				>
					Un service traiteur flexible et gourmand.
				</h2>
				<div style="display: grid; gap: 0; margin-top: 32px; max-width: 460px;">
					{#each ['Bouchées et canapés pour cocktails', 'Buffets et repas de groupe', 'Plateaux à partager', 'Menus personnalisés selon votre événement', 'Service de bar et options boissons, au besoin', 'Formules clé en main : nourriture, service et ambiance'] as item, i}
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
					événements mémorables. Que ce soit chez vous, dans vos bureaux, dans une salle louée ou
					directement au 100 Génies, nous adaptons notre offre à votre occasion, à votre groupe et à
					votre budget.
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
						style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #d9a44c;"
						>Pour quels événements ?</span
					>
					<h2
						style="margin: 18px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-size: clamp(30px, 4vw, 56px); line-height: 1.05; color: #fbf8f2;"
					>
						Particuliers, entreprises<br />et organisateurs.
					</h2>
				</div>
				<p style="margin: 0; max-width: 300px; font-size: 14.5px; line-height: 1.7; color: #9d9689;">
					De la fête de famille au lancement corporatif — on ajuste le menu, les quantités et le
					service.
				</p>
			</div>
			<div
				style="margin-top: clamp(32px, 4.5vw, 56px); display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));"
			>
				{#each [['01', "Anniversaires, fêtes privées et célébrations familiales"], ['02', 'Mariages, fiançailles et repas de répétition'], ['03', "Réunions d'équipe, lunchs corporatifs et événements de bureau"], ['04', 'Partys de Noël, lancements et activités de reconnaissance'], ['05', 'Cocktails, 5 à 7, réseautage et événements-bénéfice'], ['06', 'Événements communautaires, culturels ou sportifs']] as [num, text]}
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
					Menu <em style="font-style: italic; color: #a07524;">Estival</em> — Aperçu
				</h2>
				<p
					style="margin: 0; max-width: 340px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; line-height: 1.7; color: #6e6656;"
				>
					Pricing et disponibilité sur demande — menu sujet à changement selon la saison.<br /><span
						style="color: #a07524;">[placeholder — confirmer prix/menu avec la cuisine avant publication]</span
					>
				</p>
			</div>

			<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; align-items: baseline; gap: 16px;">
				<h3
					style="margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #17150f;"
				>
					Bouchées froides
				</h3>
				<span style="flex: 1; height: 1px; background: rgba(23,21,15,0.12);"></span>
				<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #9a927f;">06</span>
			</div>
			<div
				style="margin-top: 26px; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(272px, 1fr));"
			>
				{#each [['Ceviche de crevettes', 'Lime et coriandre'], ['Bruschetta tomates cerises', 'Basilic et burrata'], ['Tartare de saumon', 'Mangue et lime'], ['Verrine pastèque', 'Féta et menthe'], ['Brochette caprese', 'Tomate, bocconcini, basilic'], ['Crostini houmous', 'Concombre et zeste de citron']] as [title, desc]}
					<article class="menu-card" style="padding: 26px; border: 1px solid rgba(23,21,15,0.1); border-radius: 4px; background: #fff; transition: all .25s ease;">
						<div
							style="height: 132px; margin: -26px -26px 22px; background-image: repeating-linear-gradient(135deg, #efe9dd 0px, #efe9dd 10px, #e6dfd0 10px, #e6dfd0 20px); display: flex; align-items: center; justify-content: center;"
						>
							<span
								style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #96876a;"
								>[photo]</span
							>
						</div>
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
					Plats à partager
				</h3>
				<span style="flex: 1; height: 1px; background: rgba(23,21,15,0.12);"></span>
				<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #9a927f;">02</span>
			</div>
			<div
				style="margin-top: 26px; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));"
			>
				{#each [['Rouleaux de printemps', 'Crevettes et vermicelles'], ['Brochettes de poulet grillé', 'Ananas et teriyaki']] as [title, desc]}
					<article
						class="menu-card"
						style="display: flex; align-items: stretch; gap: 22px; border: 1px solid rgba(23,21,15,0.1); border-radius: 4px; background: #fff; transition: all .25s ease;"
					>
						<div
							style="width: 40%; min-width: 120px; background-image: repeating-linear-gradient(135deg, #efe9dd 0px, #efe9dd 10px, #e6dfd0 10px, #e6dfd0 20px); display: flex; align-items: center; justify-content: center;"
						>
							<span
								style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #96876a;"
								>[photo]</span
							>
						</div>
						<div style="padding: 30px 26px 30px 0;">
							<h4
								style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: 27px; line-height: 1.15;"
							>
								{title}
							</h4>
							<p style="margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #6b6353;">{desc}</p>
						</div>
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
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(217,164,76,0.8);"
					>[placeholder — photographie de bouchées à venir]</span
				>
			</div>
			<div
				style="margin-top: clamp(28px, 4vw, 48px); display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); grid-auto-rows: minmax(190px, auto); grid-auto-flow: dense;"
			>
				{#each [['plateau à partager', 240], ['bouchée froide', 190], ['verrine', 190], ['salle · 5 à 7', 190], ['brochettes', 190], ['dressage de buffet', 190]] as [label, minH]}
					<div
						class="gallery-tile"
						style="min-height: {minH}px; background-image: repeating-linear-gradient(135deg, #262119 0px, #262119 11px, #1e1a14 11px, #1e1a14 22px); display: flex; align-items: center; justify-content: center; transition: filter .3s ease;"
					>
						<span
							style="font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #857a63;"
							>{label}</span
						>
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
						Variables selon le type d'événement. <span
							style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #a07524;"
							>[placeholder — confirmer le minimum exact]</span
						>
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
					style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #a07524;"
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
					Notre équipe peut offrir le service sur place au bar, dans un lieu de votre choix, ou en
					formule de livraison et cueillette, selon vos besoins.
				</p>
				<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px;">
					<span
						style="padding: 10px 18px; background: #17150f; border-radius: 999px; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #f0e7d5;"
						>Sur place au bar</span
					>
					<span
						style="padding: 10px 18px; border: 1px solid rgba(23,21,15,0.18); border-radius: 999px; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #4a4437;"
						>Hors site</span
					>
					<span
						style="padding: 10px 18px; border: 1px solid rgba(23,21,15,0.18); border-radius: 999px; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #4a4437;"
						>Livraison / cueillette</span
					>
				</div>
			</div>
			<div
				style="min-height: 340px; background-image: repeating-linear-gradient(135deg, #efe9dd 0px, #efe9dd 11px, #e6dfd0 11px, #e6dfd0 22px); display: flex; align-items: center; justify-content: center;"
			>
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #96876a;"
					>[placeholder] salle du 100 génies</span
				>
			</div>
		</div>
	</section>

	<section id="demande" style="background: #0c0b0a; padding: clamp(56px, 9vw, 130px) clamp(20px, 5vw, 64px);">
		<div
			style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(34px, 5vw, 72px); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: start;"
		>
			<div>
				<span
					style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #d9a44c;"
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
				style="display: grid; gap: 18px; padding: clamp(24px, 3vw, 40px); background: #14120f; border: 1px solid rgba(245,241,234,0.1); border-radius: 6px;"
			>
				<div style="display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
					<label
						style="display: grid; gap: 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #9d9689;"
					>
						Nom
						<input
							type="text"
							placeholder="Prénom et nom"
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
							placeholder="vous@exemple.com"
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
							placeholder="(514) 000-0000"
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
							placeholder="JJ / MM / AAAA"
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
						placeholder="ex. 60"
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
						placeholder="Type d'événement, allergies, demandes spéciales…"
						class="form-field"
						style="padding: 14px 16px; background: #0e0d0b; border: 1px solid rgba(245,241,234,0.14); border-radius: 3px; color: #f5f1ea; font-size: 15px; line-height: 1.6; letter-spacing: 0; text-transform: none; resize: vertical;"
					></textarea>
				</label>
				<button
					type="button"
					class="submit-btn"
					style="margin-top: 6px; padding: 17px 26px; border: none; border-radius: 999px; background: #d9a44c; color: #14120f; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; cursor: pointer; transition: all .2s ease;"
				>
					Envoyer la demande
				</button>
				<span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6f695d;"
					>Maquette — formulaire non fonctionnel</span
				>
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
					Mille et une Bouchées
				</div>
				<div
					style="margin-top: 6px; font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 16px; color: #d9a44c;"
				>
					Mille et une façons de se régaler
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
					<a href="#menu" class="footer-link" style="font-size: 14.5px; color: #cfc8bd;">Menu estival</a>
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

	.hero-cta:hover {
		background: #f0c885;
		box-shadow: 0 22px 50px -18px rgba(240, 200, 133, 0.75);
	}

	.hero-cta:active {
		background: #c08e38;
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
		filter: brightness(1.25);
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
