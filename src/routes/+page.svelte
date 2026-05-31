<script lang="ts">
	type ProfilePreview = {
		handle?: string;
		displayName?: string;
		avatar?: string;
	};

	const endpoints = [
		{ path: '/health.json', description: 'Service status and configured identity summary' },
		{
			path: '/profile.json',
			description: 'Resolved ATProto profile for the configured identity'
		},
		{
			path: '/posts.json',
			description: 'Normalized recent standard.site documents for the configured identity'
		},
		{ path: '/views.json', description: 'Configured view definitions for the current identity' },
		{ path: '/views/recent.json', description: 'Resolved items for a configured view' }
	];

	let { data }: { data: { profile: ProfilePreview | null } } = $props();
</script>

<svelte:head>
	<title>ATField</title>
	<meta name="description" content="ATProto-first personal endpoint kit" />
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-12 sm:px-8">
	<header class="space-y-4">
		<p class="text-sm font-medium tracking-[0.24em] text-sky-600 uppercase">ATField v0</p>
		<div class="space-y-3">
			<h1 class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
				ATProto-first personal endpoint kit
			</h1>
			<p class="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
				A read-only service that fetches public upstream ATProto data for one configured identity
				and exposes it through simple HTTP endpoints.
			</p>
		</div>
	</header>

	<section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold text-slate-900">Avatar preview</h2>
				<p class="text-sm text-slate-600">
					Server-loaded profile avatar rendered from the ATProto blob URL.
				</p>
			</div>

			{#if data.profile?.avatar}
				<div
					class="flex max-w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:max-w-xl"
				>
					<img
						src={data.profile.avatar}
						alt={data.profile.displayName ?? data.profile.handle ?? 'ATProto avatar'}
						class="h-12 w-12 rounded-full border border-slate-200 object-cover"
					/>
					<div class="min-w-0 text-sm">
						<p class="font-medium text-slate-900">
							{data.profile.displayName ?? data.profile.handle}
						</p>
						<p class="font-mono text-xs break-all text-slate-500">{data.profile.avatar}</p>
					</div>
				</div>
			{:else}
				<p class="text-sm text-slate-500">
					No avatar URL was returned by <code>/profile.json</code>.
				</p>
			{/if}
		</div>
	</section>

	<section class="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
		<div class="space-y-2">
			<h2 class="text-xl font-semibold text-slate-900">Configure</h2>
			<p class="text-sm leading-6 text-slate-600">
				Edit <code class="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">atfield.config.ts</code
				>
				with your <code class="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">handle</code>
				and optionally your
				<code class="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">did</code>.
			</p>
			<p class="text-sm leading-6 text-slate-600">
				Minimal views are also configured in
				<code class="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">atfield.config.ts</code>
				and currently project the configured identity&apos;s standard.site documents.
			</p>
		</div>

		<div class="space-y-3">
			<h2 class="text-xl font-semibold text-slate-900">Endpoints</h2>
			<ul class="grid gap-3">
				{#each endpoints as endpoint (endpoint.path)}
					<li class="rounded-xl border border-slate-200 bg-slate-50 p-4">
						<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
							<code class="font-mono text-sm text-sky-700">
								{endpoint.path}
							</code>
							<p class="text-sm text-slate-600">{endpoint.description}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>
