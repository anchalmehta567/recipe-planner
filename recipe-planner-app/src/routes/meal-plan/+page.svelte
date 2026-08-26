<script lang="ts">
	import { mealPlan } from '$lib/stores/meal-plan.svelte';
	import { WEEK_DAYS, type WeekDay } from '$lib/types';

	function onRemove(e: CustomEvent<{ day: string }>) {
		mealPlan.remove(e.detail.day as WeekDay);
	}
</script>

<div class="container">
	<h1 class="page-title">Weekly meal plan</h1>
	<p class="hint">Open a recipe and use "Add to meal plan" to assign it to a day.</p>

	<div class="plan-grid">
		{#each WEEK_DAYS as day (day)}
			{@const meal = mealPlan.days[day]}
			<rp-day-slot
				day={day}
				recipeTitle={meal?.title}
				recipeImage={meal?.image}
				onrpRemoveMeal={onRemove}
			></rp-day-slot>
		{/each}
	</div>
</div>

<style>
	.hint {
		color: var(--color-muted);
		margin-top: -0.5rem;
	}

	.plan-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}
</style>
