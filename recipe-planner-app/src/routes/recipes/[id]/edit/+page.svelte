<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { userRecipes } from '$lib/stores/user-recipes.svelte';
	import type { RecipeInput } from '$lib/recipe-validation';
	import type { Recipe } from '$lib/types';

	let recipe = $state<Recipe | undefined>(undefined);
	let checked = $state(false);

	onMount(() => {
		recipe = page.params.id ? userRecipes.getById(page.params.id) : undefined;
		checked = true;
	});

	function toInput(r: Recipe): RecipeInput {
		return {
			title: r.title,
			category: r.category ?? '',
			area: r.area ?? '',
			image: r.image ?? '',
			instructions: r.instructions,
			ingredients: r.ingredients.map((i) => ({ ...i }))
		};
	}

	function handleSubmit(input: RecipeInput) {
		if (!recipe) return;
		userRecipes.update(recipe.id, input);
		goto(`/recipes/${recipe.id}`);
	}
</script>

<div class="container">
	<h1 class="page-title">Edit recipe</h1>

	{#if !checked}
		<p>Loading…</p>
	{:else if !recipe}
		<rp-empty-state
			heading="Can't edit this recipe"
			message="Only recipes you created can be edited."
		>
			<a class="btn btn-primary" href="/">Back to discovery</a>
		</rp-empty-state>
	{:else}
		<RecipeForm initial={toInput(recipe)} submitLabel="Save changes" onSubmit={handleSubmit} />
	{/if}
</div>
