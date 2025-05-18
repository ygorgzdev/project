<!-- src/routes/+page.svelte -->
<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>IncubePro - Conectando Desenvolvedores e Investidores</title>
	<meta
		name="description"
		content="Plataforma para conectar desenvolvedores e investidores de projetos de tecnologia"
	/>
	<meta name="theme-color" content="#2563eb" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<NavBar />

	<main class="flex-grow">
		<!-- Hero Section -->
		<section class="bg-blue-700 py-20 text-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="text-center md:flex md:items-center md:justify-between md:text-left">
					<div class="md:w-1/2">
						<h1 class="mb-4 text-4xl font-bold md:text-5xl">Conectando talento e capital</h1>
						<p class="mb-8 text-xl">
							Transforme suas ideias em realidade. IncubePro é a plataforma que conecta
							desenvolvedores talentosos com investidores visionários.
						</p>
						<div class="space-x-4">
							<a
								href="/register?role=developer"
								class="rounded-lg bg-white px-6 py-3 text-lg font-medium text-blue-700 hover:bg-gray-100"
							>
								Sou Desenvolvedor
							</a>
							<a
								href="/register?role=investor"
								class="rounded-lg bg-blue-900 px-6 py-3 text-lg font-medium text-white hover:bg-blue-800"
							>
								Sou Investidor
							</a>
						</div>
					</div>
					<div class="hidden md:block md:w-1/2">
						<img
							src="/c1.jpg"
							alt="Colaboração entre desenvolvedores e investidores"
							class="mx-auto"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Recursos Section -->
		<section class="bg-gray-50 py-16">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 class="mb-12 text-center text-3xl font-bold">Como funciona</h2>

				<div class="grid gap-8 md:grid-cols-3">
					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-4 text-4xl text-blue-600">1</div>
						<h3 class="mb-2 text-xl font-semibold">Cadastre seu projeto</h3>
						<p class="text-gray-600">
							Desenvolvedores podem cadastrar seus projetos com detalhes, objetivos e necessidades
							de investimento.
						</p>
					</div>

					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-4 text-4xl text-blue-600">2</div>
						<h3 class="mb-2 text-xl font-semibold">Conecte-se</h3>
						<p class="text-gray-600">
							Investidores podem explorar projetos e conectar-se com desenvolvedores que
							compartilham da mesma visão.
						</p>
					</div>

					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-4 text-4xl text-blue-600">3</div>
						<h3 class="mb-2 text-xl font-semibold">Transforme ideias em realidade</h3>
						<p class="text-gray-600">
							Com o investimento certo, transforme seu projeto em um produto de sucesso no mercado.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="bg-blue-600 py-16 text-white">
			<div class="mx-auto max-w-4xl px-4 text-center">
				<h2 class="mb-4 text-3xl font-bold">Pronto para começar?</h2>
				<p class="mb-8 text-xl">
					Junte-se a milhares de desenvolvedores e investidores que já estão usando o IncubePro.
				</p>
				<a
					href="/register"
					class="rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 hover:bg-gray-100"
				>
					Cadastre-se Gratuitamente
				</a>
			</div>
		</section>
	</main>

	<Footer />
</div>
