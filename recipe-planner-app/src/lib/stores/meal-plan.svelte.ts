import { browser } from '$app/environment';
import type { MealPlan, RecipeSummary, WeekDay } from '$lib/types';

const STORAGE_KEY = 'rp:mealPlan';

function load(): MealPlan {
	if (!browser) return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as MealPlan) : {};
	} catch {
		return {};
	}
}

class MealPlanStore {
	days = $state<MealPlan>(load());

	#persist() {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.days));
	}

	assign(day: WeekDay, recipe: RecipeSummary) {
		this.days = { ...this.days, [day]: recipe };
		this.#persist();
	}

	remove(day: WeekDay) {
		const next = { ...this.days };
		delete next[day];
		this.days = next;
		this.#persist();
	}
}

export const mealPlan = new MealPlanStore();
