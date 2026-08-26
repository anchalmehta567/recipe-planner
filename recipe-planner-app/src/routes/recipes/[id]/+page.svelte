<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getRecipe } from '$lib/get-recipe';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { mealPlan } from '$lib/stores/meal-plan.svelte';
	import { userRecipes } from '$lib/stores/user-recipes.svelte';
	import { WEEK_DAYS, type Recipe, type WeekDay } from '$lib/types';

	let recipe = $state<Recipe | null>(null);
	let loading = $state(true);
	let notFound = $state(false);
	let selectedDay = $state<WeekDay>('Monday');
	let addedMessage = $state('');

	const id = $derived(page.params.id);

	async function load() {
		if (!id) return;
		loading = true;
		notFound = false;
		const r = await getRecipe(id);
		recipe = r;
		notFound = !r;
		loading = false;
	}

	onMount(load);
	$effect(() => {
		if (id) load();
	});

	function toggleFavorite() {
		if (!recipe) return;
		favorites.toggle({
			id: recipe.id,
			source: recipe.source,
			title: recipe.title,
			image: recipe.image,
			category: recipe.category,
			area: recipe.area
		});
	}

	function addToPlan() {
		if (!recipe) return;
		const existing = mealPlan.days[selectedDay];
		if (existing && existing.id !== recipe.id) {
			const confirmed = confirm(
				`${selectedDay} already has "${existing.title}". Replace it with "${recipe.title}"?`
			);
			if (!confirmed) return;
		}
		mealPlan.assign(selectedDay, {
			id: recipe.id,
			source: recipe.source,
			title: recipe.title,
			image: recipe.image,
			category: recipe.category,
			area: recipe.area
		});
		addedMessage = `Added to ${selectedDay}.`;
		setTimeout(() => (addedMessage = ''), 2500);
	}

	function deleteRecipe() {
		if (!recipe) return;
		if (confirm(`Delete "${recipe.title}"? This cannot be undone.`)) {
			userRecipes.remove(recipe.id);
			goto('/');
		}
	}
</script>

<div class="container">
	{#if loading}
		<p>Loading recipe…</p>
	{:else if notFound || !recipe}
		<rp-empty-state heading="Recipe not found" message="It may have been removed.">
			<a class="btn btn-primary" href="/">Back to discovery</a>
		</rp-empty-state>
	{:else}
		<div class="detail">
			<div class="media">
				{#if recipe.image}
					<img src={recipe.image} alt={recipe.title} />
				{/if}
			</div>
			<div class="body">
				<h1>{recipe.title}</h1>
				<div class="badges">
					{#if recipe.category}
						<rp-badge label={recipe.category} variant="category"></rp-badge>
					{/if}
					{#if recipe.area}
						<rp-badge label={recipe.area} variant="area"></rp-badge>
					{/if}
					{#if recipe.source === 'local'}
						<rp-badge label="My Recipe" variant="success"></rp-badge>
					{/if}
				</div>

				<div class="actions">
					<button class="btn" onclick={toggleFavorite}>
						{favorites.isFavorite(recipe.id) ? '♥ Remove favorite' : '♡ Add to favorites'}
					</button>
					{#if recipe.source === 'local'}
						<a class="btn" href={`/recipes/${recipe.id}/edit`}>Edit</a>
						<button class="btn btn-danger" onclick={deleteRecipe}>Delete</button>
					{/if}
				</div>

				<div class="plan-picker">
					<select bind:value={selectedDay} aria-label="Day of week">
						{#each WEEK_DAYS as day (day)}
							<option value={day}>{day}</option>
						{/each}
					</select>
					<button class="btn btn-primary" onclick={addToPlan}>Add to meal plan</button>
					{#if addedMessage}
						<span class="added-message">{addedMessage}</span>
					{/if}
				</div>

				<h2>Ingredients</h2>
				<ul class="ingredients">
					{#each recipe.ingredients as ing (ing.name)}
						<li>{ing.measure ? `${ing.measure} ` : ''}{ing.name}</li>
					{/each}
				</ul>

				<h2>Instructions</h2>
				<p class="instructions">{recipe.instructions}</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.detail {
		display: grid;
		grid-template-columns: minmax(0, 380px) 1fr;
		gap: 2rem;
		margin-top: 1.5rem;
	}

	@media (max-width: 720px) {
		.detail {
			grid-template-columns: 1fr;
		}
	}

	.media img {
		width: 100%;
		border-radius: var(--radius);
		object-fit: cover;
	}

	.badges {
		display: flex;
		gap: 0.5rem;
		margin: 0.5rem 0 1.25rem;
	}

	.actions,
	.plan-picker {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}

	.added-message {
		color: var(--color-primary);
		font-size: 0.9rem;
	}

	.ingredients {
		padding-left: 1.25rem;
	}

	.instructions {
		white-space: pre-line;
		line-height: 1.6;
	}
</style>
