import type { Ingredient, Recipe, RecipeSummary } from '$lib/types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

interface RawMeal {
	idMeal: string;
	strMeal: string;
	strCategory?: string;
	strArea?: string;
	strInstructions?: string;
	strMealThumb?: string;
	strTags?: string | null;
	[key: `strIngredient${number}`]: string | undefined;
	[key: `strMeasure${number}`]: string | undefined;
}

interface RawMealSummary {
	idMeal: string;
	strMeal: string;
	strMealThumb?: string;
}

function toIngredients(meal: RawMeal): Ingredient[] {
	const ingredients: Ingredient[] = [];
	for (let i = 1; i <= 20; i++) {
		const name = meal[`strIngredient${i}`]?.trim();
		const measure = meal[`strMeasure${i}`]?.trim();
		if (name) {
			ingredients.push({ name, measure: measure || '' });
		}
	}
	return ingredients;
}

function toRecipe(meal: RawMeal): Recipe {
	return {
		id: meal.idMeal,
		source: 'api',
		title: meal.strMeal,
		image: meal.strMealThumb,
		category: meal.strCategory,
		area: meal.strArea,
		instructions: meal.strInstructions ?? '',
		ingredients: toIngredients(meal),
		tags: meal.strTags ? meal.strTags.split(',').map((t) => t.trim()).filter(Boolean) : undefined
	};
}

function toSummary(meal: RawMealSummary): RecipeSummary {
	return {
		id: meal.idMeal,
		source: 'api',
		title: meal.strMeal,
		image: meal.strMealThumb
	};
}

async function getJson<T>(path: string): Promise<T> {
	const res = await fetch(`${BASE_URL}/${path}`);
	if (!res.ok) {
		throw new Error(`TheMealDB request failed: ${res.status} ${res.statusText}`);
	}
	return res.json();
}

export async function searchByName(query: string): Promise<RecipeSummary[]> {
	const data = await getJson<{ meals: RawMeal[] | null }>(`search.php?s=${encodeURIComponent(query)}`);
	return (data.meals ?? []).map(toRecipe).map((r) => ({
		id: r.id,
		source: r.source,
		title: r.title,
		image: r.image,
		category: r.category,
		area: r.area
	}));
}

export async function filterByCategory(category: string): Promise<RecipeSummary[]> {
	const data = await getJson<{ meals: RawMealSummary[] | null }>(
		`filter.php?c=${encodeURIComponent(category)}`
	);
	return (data.meals ?? []).map(toSummary);
}

export async function filterByArea(area: string): Promise<RecipeSummary[]> {
	const data = await getJson<{ meals: RawMealSummary[] | null }>(`filter.php?a=${encodeURIComponent(area)}`);
	return (data.meals ?? []).map(toSummary);
}

export async function lookupById(id: string): Promise<Recipe | null> {
	const data = await getJson<{ meals: RawMeal[] | null }>(`lookup.php?i=${encodeURIComponent(id)}`);
	const meal = data.meals?.[0];
	return meal ? toRecipe(meal) : null;
}

export async function listCategories(): Promise<string[]> {
	const data = await getJson<{ meals: { strCategory: string }[] | null }>('list.php?c=list');
	return [...new Set((data.meals ?? []).map((m) => m.strCategory))].sort();
}

export async function listAreas(): Promise<string[]> {
	const data = await getJson<{ meals: { strArea: string }[] | null }>('list.php?a=list');
	return [...new Set((data.meals ?? []).map((m) => m.strArea))].sort();
}
