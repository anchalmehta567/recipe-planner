import { browser } from '$app/environment';
import type { RecipeSummary } from '$lib/types';

const STORAGE_KEY = 'rp:favorites';

function load(): RecipeSummary[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as RecipeSummary[]) : [];
	} catch {
		return [];
	}
}

class FavoritesStore {
	items = $state<RecipeSummary[]>(load());

	#persist() {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
	}

	isFavorite(id: string): boolean {
		return this.items.some((r) => r.id === id);
	}

	add(recipe: RecipeSummary) {
		if (!this.isFavorite(recipe.id)) {
			this.items = [...this.items, recipe];
			this.#persist();
		}
	}

	remove(id: string) {
		this.items = this.items.filter((r) => r.id !== id);
		this.#persist();
	}

	toggle(recipe: RecipeSummary) {
		if (this.isFavorite(recipe.id)) {
			this.remove(recipe.id);
		} else {
			this.add(recipe);
		}
	}
}

export const favorites = new FavoritesStore();
