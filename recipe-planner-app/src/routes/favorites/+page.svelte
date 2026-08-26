<script lang="ts">
	import { goto } from '$app/navigation';
	import { favorites } from '$lib/stores/favorites.svelte';

	function onCardClick(e: CustomEvent<{ recipeId: string }>) {
		goto(`/recipes/${e.detail.recipeId}`);
	}

	function onFavoriteToggle(e: CustomEvent<{ recipeId: string }>) {
		favorites.remove(e.detail.recipeId);
	}
</script>

<div class="container">
	<h1 class="page-title">Your favorites</h1>

	{#if favorites.items.length === 0}
		<rp-empty-state heading="No favorites yet" message="Heart a recipe to save it here.">
			<a class="btn btn-primary" href="/">Browse recipes</a>
		</rp-empty-state>
	{:else}
		<div class="recipe-grid">
			{#each favorites.items as recipe (recipe.id)}
				<rp-recipe-card
					recipeId={recipe.id}
					recipeTitle={recipe.title}
					image={recipe.image}
					category={recipe.category}
					area={recipe.area}
					favorite={true}
					onrpCardClick={onCardClick}
					onrpFavoriteToggle={onFavoriteToggle}
				></rp-recipe-card>
			{/each}
		</div>
	{/if}
</div>
