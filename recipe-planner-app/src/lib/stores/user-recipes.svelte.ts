import { browser } from '$app/environment';
import type { Recipe } from '$lib/types';
import type { RecipeInput } from '$lib/recipe-validation';

const STORAGE_KEY = 'rp:userRecipes';

function load(): Recipe[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Recipe[]) : [];
	} catch {
		return [];
	}
}

function toRecipe(id: string, input: RecipeInput): Recipe {
	return {
		id,
		source: 'local',
		title: input.title.trim(),
		image: input.image.trim() || undefined,
		category: input.category.trim() || undefined,
		area: input.area.trim() || undefined,
		instructions: input.instructions.trim(),
		ingredients: input.ingredients
			.filter((i) => i.name.trim())
			.map((i) => ({ name: i.name.trim(), measure: i.measure.trim() }))
	};
}

class UserRecipesStore {
	items = $state<Recipe[]>(load());

	#persist() {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
	}

	getById(id: string): Recipe | undefined {
		return this.items.find((r) => r.id === id);
	}

	create(input: RecipeInput): Recipe {
		const id = `local-${crypto.randomUUID()}`;
		const recipe = toRecipe(id, input);
		this.items = [...this.items, recipe];
		this.#persist();
		return recipe;
	}

	update(id: string, input: RecipeInput): Recipe | undefined {
		if (!this.getById(id)) return undefined;
		const updated = toRecipe(id, input);
		this.items = this.items.map((r) => (r.id === id ? updated : r));
		this.#persist();
		return updated;
	}

	remove(id: string) {
		this.items = this.items.filter((r) => r.id !== id);
		this.#persist();
	}
}

export const userRecipes = new UserRecipesStore();
