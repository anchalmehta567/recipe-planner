export interface Ingredient {
	name: string;
	measure: string;
}

export type RecipeSource = 'api' | 'local';

export interface Recipe {
	id: string;
	source: RecipeSource;
	title: string;
	image?: string;
	category?: string;
	area?: string;
	instructions: string;
	ingredients: Ingredient[];
	tags?: string[];
}

/** Lightweight summary used for browse/filter grids and favorites, before full details are loaded. */
export interface RecipeSummary {
	id: string;
	source: RecipeSource;
	title: string;
	image?: string;
	category?: string;
	area?: string;
}

export const WEEK_DAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];

export type MealPlan = Partial<Record<WeekDay, RecipeSummary>>;
