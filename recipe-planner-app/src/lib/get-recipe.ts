import type { Recipe } from '$lib/types';
import { lookupById } from '$lib/api/themealdb';
import { userRecipes } from '$lib/stores/user-recipes.svelte';

export async function getRecipe(id: string): Promise<Recipe | null> {
	if (id.startsWith('local-')) {
		return userRecipes.getById(id) ?? null;
	}
	return lookupById(id);
}
