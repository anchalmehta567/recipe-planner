import type { Ingredient } from '$lib/types';

export interface RecipeInput {
	title: string;
	category: string;
	area: string;
	image: string;
	instructions: string;
	ingredients: Ingredient[];
}

export interface RecipeValidationErrors {
	title?: string;
	image?: string;
	instructions?: string;
	ingredients?: string;
}

export function emptyRecipeInput(): RecipeInput {
	return {
		title: '',
		category: '',
		area: '',
		image: '',
		instructions: '',
		ingredients: [{ name: '', measure: '' }]
	};
}

export function validateRecipeInput(input: RecipeInput): RecipeValidationErrors {
	const errors: RecipeValidationErrors = {};

	if (!input.title.trim()) {
		errors.title = 'Title is required.';
	} else if (input.title.trim().length < 3) {
		errors.title = 'Title must be at least 3 characters.';
	}

	if (input.image.trim() && !/^https?:\/\/.+/i.test(input.image.trim())) {
		errors.image = 'Image must be a valid URL starting with http:// or https://.';
	}

	if (!input.instructions.trim()) {
		errors.instructions = 'Instructions are required.';
	} else if (input.instructions.trim().length < 20) {
		errors.instructions = 'Instructions should be at least 20 characters.';
	}

	const filledIngredients = input.ingredients.filter((i) => i.name.trim());
	if (filledIngredients.length === 0) {
		errors.ingredients = 'Add at least one ingredient.';
	}

	return errors;
}

export function isValid(errors: RecipeValidationErrors): boolean {
	return Object.keys(errors).length === 0;
}
