<script lang="ts">
	import { goto } from '$app/navigation';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { userRecipes } from '$lib/stores/user-recipes.svelte';
	import { emptyRecipeInput, type RecipeInput } from '$lib/recipe-validation';

	function handleSubmit(input: RecipeInput) {
		const recipe = userRecipes.create(input);
		goto(`/recipes/${recipe.id}`);
	}
</script>

<div class="container">
	<h1 class="page-title">Add a recipe</h1>
	<RecipeForm initial={emptyRecipeInput()} submitLabel="Create recipe" onSubmit={handleSubmit} />
</div>
