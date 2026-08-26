<script lang="ts">
	import { validateRecipeInput, isValid, type RecipeInput, type RecipeValidationErrors } from '$lib/recipe-validation';

	interface Props {
		initial: RecipeInput;
		submitLabel: string;
		onSubmit: (input: RecipeInput) => void;
	}

	let { initial, submitLabel, onSubmit }: Props = $props();

	let title = $state(initial.title);
	let category = $state(initial.category);
	let area = $state(initial.area);
	let image = $state(initial.image);
	let instructions = $state(initial.instructions);
	let ingredients = $state(initial.ingredients.map((i) => ({ ...i })));
	let errors = $state<RecipeValidationErrors>({});
	let submitted = $state(false);

	function addIngredientRow() {
		ingredients = [...ingredients, { name: '', measure: '' }];
	}

	function removeIngredientRow(index: number) {
		ingredients = ingredients.filter((_, i) => i !== index);
		if (ingredients.length === 0) addIngredientRow();
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
		const input: RecipeInput = { title, category, area, image, instructions, ingredients };
		errors = validateRecipeInput(input);
		if (isValid(errors)) {
			onSubmit(input);
		}
	}
</script>

<form onsubmit={handleSubmit} novalidate>
	<div class="field">
		<label for="title">Title *</label>
		<input id="title" bind:value={title} placeholder="e.g. Grandma's Lasagna" />
		{#if submitted && errors.title}<span class="field-error">{errors.title}</span>{/if}
	</div>

	<div class="two-col">
		<div class="field">
			<label for="category">Category</label>
			<input id="category" bind:value={category} placeholder="e.g. Dessert" />
		</div>
		<div class="field">
			<label for="area">Cuisine</label>
			<input id="area" bind:value={area} placeholder="e.g. Italian" />
		</div>
	</div>

	<div class="field">
		<label for="image">Image URL</label>
		<input id="image" bind:value={image} placeholder="https://..." />
		{#if submitted && errors.image}<span class="field-error">{errors.image}</span>{/if}
	</div>

	<div class="field">
		<span>Ingredients *</span>
		{#each ingredients as ingredient, index (index)}
			<div class="ingredient-row">
				<input bind:value={ingredient.name} placeholder="Ingredient (e.g. Flour)" aria-label={`Ingredient ${index + 1} name`} />
				<input bind:value={ingredient.measure} placeholder="Measure (e.g. 2 cups)" aria-label={`Ingredient ${index + 1} measure`} />
				<button type="button" class="btn btn-danger" onclick={() => removeIngredientRow(index)}>Remove</button>
			</div>
		{/each}
		<button type="button" class="btn" onclick={addIngredientRow}>+ Add ingredient</button>
		{#if submitted && errors.ingredients}<span class="field-error">{errors.ingredients}</span>{/if}
	</div>

	<div class="field">
		<label for="instructions">Instructions *</label>
		<textarea id="instructions" bind:value={instructions} rows="8" placeholder="Step-by-step instructions..."
		></textarea>
		{#if submitted && errors.instructions}<span class="field-error">{errors.instructions}</span>{/if}
	</div>

	<button type="submit" class="btn btn-primary">{submitLabel}</button>
</form>

<style>
	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	@media (max-width: 560px) {
		.two-col {
			grid-template-columns: 1fr;
		}
	}
</style>
