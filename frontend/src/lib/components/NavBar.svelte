<script>
	let isMenuOpen = false;
	let scrolled = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleScroll() {
		if (window.scrollY > 50) {
			scrolled = true;
		} else {
			scrolled = false;
		}
	}

	// Adiciona um listener para o evento de scroll quando o componente é montado
	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		// Remove o listener quando o componente é destruído para evitar vazamentos de memória
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	import { onMount } from 'svelte';
</script>

<nav class="fixed z-50 w-full bg-white bg-opacity-80 shadow-md backdrop-blur-sm" class:scrolled>
	<div
		class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 transition-all duration-300 md:py-3"
	>
		<a href="/" class="flex items-center space-x-2">
			<svg
				class="h-8 w-8 text-indigo-600 transition-all duration-300"
				class:h-7={scrolled}
				class:w-7={scrolled}
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 2L2 7l10 5 10-5-10-5z" />
				<path d="M2 17l10 5 10-5" />
				<path d="M2 12l10 5 10-5" />
			</svg>
			<span
				class="text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600"
				class:text-lg={scrolled}>IncubePro</span
			>
		</a>

		<div class="hidden space-x-8 font-semibold text-gray-700 md:flex">
			<a
				href="/"
				class="flex items-center space-x-1 transition-colors duration-300 hover:text-indigo-600"
			>
				<svg
					class="h-5 w-5 transition-all duration-300"
					class:h-4={scrolled}
					class:w-4={scrolled}
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 9l9-7 9 7" />
					<path d="M9 22V12h6v10" />
				</svg>
				<span>Home</span>
			</a>

			<a
				href="/projects"
				class="flex items-center space-x-1 transition-colors duration-300 hover:text-indigo-600"
			>
				<svg
					class="h-5 w-5 transition-all duration-300"
					class:h-4={scrolled}
					class:w-4={scrolled}
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 7h4l3 3h11v11H3z" />
					<path d="M3 7V5a2 2 0 012-2h5l3 3" />
				</svg>
				<span>Projetos</span>
			</a>

			<a
				href="/about"
				class="flex items-center space-x-1 transition-colors duration-300 hover:text-indigo-600"
			>
				<svg
					class="h-5 w-5 transition-all duration-300"
					class:h-4={scrolled}
					class:w-4={scrolled}
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12" y2="8" />
				</svg>
				<span>Sobre</span>
			</a>
		</div>

		<div class="flex items-center space-x-4">
			<a
				href="/login"
				class="hidden rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-indigo-700 md:inline-block"
				class:px-3={scrolled}
				class:py-1={scrolled}
			>
				Login
			</a>
			<a
				href="/register"
				class="hidden rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-300 md:inline-block"
				class:px-3={scrolled}
				class:py-1={scrolled}
			>
				Registrar
			</a>

			<button
				class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-gray-100 md:hidden"
				on:click={toggleMenu}
				aria-label="Menu mobile"
				class:h-9={scrolled}
				class:w-9={scrolled}
			>
				<svg
					class="h-6 w-6 text-gray-700 transition-all duration-300"
					class:h-5={scrolled}
					class:w-5={scrolled}
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					{#if isMenuOpen}
						<path d="M18 6L6 18" />
						<path d="M6 6l12 12" />
					{:else}
						<path d="M3 12h18" />
						<path d="M3 6h18" />
						<path d="M3 18h18" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<div class="space-y-4 bg-white px-6 py-4 font-semibold text-gray-700 shadow-md md:hidden">
			<a
				href="/"
				class="flex items-center space-x-2 transition-colors duration-300 hover:text-indigo-600"
			>
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 9l9-7 9 7" />
					<path d="M9 22V12h6v10" />
				</svg>
				<span>Home</span>
			</a>

			<a
				href="/projects"
				class="flex items-center space-x-2 transition-colors duration-300 hover:text-indigo-600"
			>
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 7h4l3 3h11v11H3z" />
					<path d="M3 7V5a2 2 0 012-2h5l3 3" />
				</svg>
				<span>Projetos</span>
			</a>

			<a
				href="/about"
				class="flex items-center space-x-2 transition-colors duration-300 hover:text-indigo-600"
			>
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12" y2="8" />
				</svg>
				<span>Sobre</span>
			</a>

			<a
				href="/login"
				class="block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-indigo-700"
			>
				Login
			</a>
			<a
				href="/register"
				class="block rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-300"
			>
				Registrar
			</a>
		</div>
	{/if}
</nav>

<style>
	nav {
		backdrop-filter: saturate(180%) blur(20px);
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05); /* Sombra inicial sutil */
	}

	nav.scrolled {
		padding-top: 12px;
		padding-bottom: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra mais forte ao rolar */
	}
</style>
