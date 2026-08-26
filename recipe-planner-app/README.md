# Recipe Finder & Meal Planner

A recipe discovery and weekly meal-planning app built with **Svelte 5** and **SvelteKit**, using the published **[@anchalmehta/recipe-ui-components](https://www.npmjs.com/package/@anchalmehta/recipe-ui-components)** StencilJS web-component library ([source](https://github.com/anchalmehta567/Recipe_Finder-Meal_Planner/tree/main/recipe-ui-components)) for its UI primitives.

- **Live app:** _add deployed URL here after deploying_
- **Repository:** https://github.com/anchalmehta567/Recipe_Finder-Meal_Planner
- **Component library on npm:** https://www.npmjs.com/package/@anchalmehta/recipe-ui-components

## Features

- **Recipe discovery** — search by name, filter by category or cuisine, browse results in a grid (via [TheMealDB](https://www.themealdb.com/api.php)'s free public API).
- **Recipe details** — ingredients, measurements, and full instructions on a dedicated page.
- **Recipe management** — create, edit, and delete your own recipes, with client-side validation before saving.
- **Favorites** — add/remove any recipe (API or your own) to a favorites list.
- **Weekly meal planner** — assign a recipe to any day of the week, swap or remove it.

## Setup

Requires Node.js 20+.

```sh
npm install
```

This installs the published `@anchalmehta/recipe-ui-components` package from npm as a regular dependency — the app does not import Stencil components from source.

## Starting the development server

```sh
npm run dev
# or, to also open a browser tab:
npm run dev -- --open
```

Other scripts:

```sh
npm run build     # production build (static output in build/)
npm run preview   # preview the production build locally
npm run check     # type-check with svelte-check
```

## Assumptions

- **No backend/auth.** Favorites, the weekly meal plan, and recipes you create are stored in the browser's `localStorage`. There is no login and no server-side database.
- **Recipe source.** Discovery and recipe details are powered by [TheMealDB](https://www.themealdb.com/api.php)'s free, keyless API. Recipes you add yourself are stored locally and are indistinguishable in the UI except for a "My Recipe" badge and the presence of Edit/Delete actions — only recipes you created can be edited or deleted.
- **Meal plan shape.** The weekly planner has one slot per day (Monday–Sunday), not separate breakfast/lunch/dinner slots.
- **Deployment.** The app is built as a static single-page app (`@sveltejs/adapter-static` with an SPA fallback), so it can be hosted on any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.) without a Node server.

## Architecture

- `src/lib/api/themealdb.ts` — TheMealDB API client.
- `src/lib/stores/*.svelte.ts` — Svelte 5 rune-based stores (favorites, meal plan, user recipes), persisted to `localStorage`.
- `src/lib/recipe-validation.ts` — validation rules for the recipe create/edit form.
- `src/lib/components/RecipeForm.svelte` — shared form used by both the "new recipe" and "edit recipe" routes.
- `src/routes/` — page routes: `/` (discovery), `/recipes/[id]` (details), `/recipes/new`, `/recipes/[id]/edit`, `/favorites`, `/meal-plan`.
- UI primitives (`<rp-search-bar>`, `<rp-recipe-card>`, `<rp-badge>`, `<rp-day-slot>`, `<rp-empty-state>`) come from the `@anchalmehta/recipe-ui-components` package, registered once in `src/routes/+layout.svelte` and used throughout the routes above via props and custom DOM events (e.g. `onrpCardClick`, `onrpFavoriteToggle`, `onrpRemoveMeal`).
