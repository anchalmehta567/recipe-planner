<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { searchByName, filterByCategory, filterByArea, listCategories, listAreas } from '$lib/api/themealdb';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { userRecipes } from '$lib/stores/user-recipes.svelte';
	import type { RecipeSummary } from '$lib/types';

	let query = $state('');
	let category = $state('');
	let area = $state('');
	let categories = $state<string[]>([]);
	let areas = $state<string[]>([]);
	let results = $state<RecipeSummary[]>([]);
	let loading = $state(true);
	let error = $state('');

	const localResults = $derived(
		userRecipes.items
			.filter((r) => {
				const matchesQuery = query.trim()
					? r.title.toLowerCase().includes(query.trim().toLowerCase())
					: true;
				const matchesCategory = category ? r.category === category : true;
				const matchesArea = area ? r.area === area : true;
				return matchesQuery && matchesCategory && matchesArea;
			})
			.map((r) => ({ id: r.id, source: r.source, title: r.title, image: r.image, category: r.category, area: r.area }))
	);

	const combined = $derived([...localResults, ...results]);

	async function runSearch() {
		loading = true;
		error = '';
		try {
			if (category) {
				results = await filterByCategory(category);
			} else if (area) {
				results = await filterByArea(area);
			} else {
				results = await searchByName(query.trim());
			}
		} catch {
			error = 'Could not load recipes right now. Please try again.';
			results = [];
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		try {
			[categories, areas] = await Promise.all([listCategories(), listAreas()]);
		} catch {
			// filters are optional; ignore failures
		}
		await runSearch();
	});

	function onSearchChange(e: CustomEvent<{ value: string }>) {
		query = e.detail.value;
		category = '';
		area = '';
		runSearch();
	}

	function onCategoryChange() {
		area = '';
		runSearch();
	}

	function onAreaChange() {
		category = '';
		runSearch();
	}

	function onCardClick(e: CustomEvent<{ recipeId: string }>) {
		goto(`/recipes/${e.detail.recipeId}`);
	}

	function onFavoriteToggle(e: CustomEvent<{ recipeId: string; favorite: boolean }>, recipe: RecipeSummary) {
		favorites.toggle(recipe);
		void e;
	}
</script>

<div class="container">
	<h1 class="page-title">Find your next recipe</h1>

	<rp-search-bar
		placeholder="Search recipes by name..."
		value={query}
		onrpSearchChange={onSearchChange}
		onrpSearchSubmit={onSearchChange}
	></rp-search-bar>

	<div class="filters">
		<div class="field">
			<label for="category">Category</label>
			<select id="category" bind:value={category} onchange={onCategoryChange}>
				<option value="">All categories</option>
				{#each categories as c (c)}
					<option value={c}>{c}</option>
				{/each}
			</select>
		</div>
		<div class="field">
			<label for="area">Cuisine</label>
			<select id="area" bind:value={area} onchange={onAreaChange}>
				<option value="">All cuisines</option>
				{#each areas as a (a)}
					<option value={a}>{a}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if loading}
		<p>Loading recipes…</p>
	{:else if error}
		<p class="field-error">{error}</p>
	{:else if combined.length === 0}
		<rp-empty-state
			heading="No recipes found"
			message="Try a different search term, or add your own recipe."
		>
			<a class="btn btn-primary" href="/recipes/new">Add a recipe</a>
		</rp-empty-state>
	{:else}
		<div class="recipe-grid">
			{#each combined as recipe (recipe.id)}
				<rp-recipe-card
					recipeId={recipe.id}
					recipeTitle={recipe.title}
					image={recipe.image}
					category={recipe.category}
					area={recipe.area}
					favorite={favorites.isFavorite(recipe.id)}
					onrpCardClick={onCardClick}
					onrpFavoriteToggle={(e: CustomEvent<{ recipeId: string; favorite: boolean }>) =>
						onFavoriteToggle(e, recipe)}
				></rp-recipe-card>
			{/each}
		</div>
	{/if}
</div>

<style>
	.filters {
		display: flex;
		gap: 1.5rem;
		margin-top: 1.25rem;
		flex-wrap: wrap;
	}

	.filters .field {
		min-width: 200px;
		margin-bottom: 0;
	}
</style>
