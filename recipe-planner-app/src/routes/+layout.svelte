<script lang="ts">
	import '@anchalmehta/recipe-ui-components';
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();

	const links = [
		{ href: '/', label: 'Discover' },
		{ href: '/favorites', label: 'Favorites' },
		{ href: '/meal-plan', label: 'Meal Plan' },
		{ href: '/recipes/new', label: '+ New Recipe' }
	];
</script>

<header class="site-header">
	<div class="container header-inner">
		<a class="brand" href="/">🍲 Recipe Planner</a>
		<nav>
			{#each links as link (link.href)}
				<a href={link.href} class:active={page.url.pathname === link.href}>{link.label}</a>
			{/each}
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>

<style>
	.site-header {
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.brand {
		font-weight: 700;
		font-size: 1.15rem;
		text-decoration: none;
	}

	nav {
		display: flex;
		gap: 1.25rem;
	}

	nav a {
		text-decoration: none;
		color: var(--color-muted);
		font-size: 0.95rem;
	}

	nav a.active,
	nav a:hover {
		color: var(--color-primary);
	}
</style>
