# @anchalmehta/recipe-ui-components

Reusable [StencilJS](https://stenciljs.com) web-component library for the [Recipe Finder & Meal Planner](https://github.com/anchalmehta567/recipe-planner) app. Framework-agnostic custom elements consumed by the SvelteKit app in `recipe-planner-app/`, but usable from any framework (or none).

- **npm:** https://www.npmjs.com/package/@anchalmehta/recipe-ui-components
- **Source:** [`recipe-ui-components/`](https://github.com/anchalmehta567/recipe-planner/tree/main/recipe-ui-components)

## Install

```sh
npm install @anchalmehta/recipe-ui-components
```

Register all components once, near your app's entry point:

```ts
import '@anchalmehta/recipe-ui-components';
```

This uses the `dist-custom-elements` build, so importing the package auto-defines every `rp-*` custom element — no separate loader script needed.

## Components

### `<rp-search-bar>`

Debounced search input.

| Prop          | Type     | Default              | Notes                              |
| ------------- | -------- | --------------------- | ----------------------------------- |
| `value`       | `string` | `''`                  | Controlled from the outside         |
| `placeholder` | `string` | `'Search recipes...'` |                                      |
| `debounce`    | `number` | `300`                 | ms before `rpSearchChange` fires    |

Events: `rpSearchChange` (debounced, `{ value }`), `rpSearchSubmit` (on Enter/submit, `{ value }`).
Slots: `icon` (overrides the default 🔍).

```html
<rp-search-bar placeholder="Search recipes..."></rp-search-bar>
<script>
  document.querySelector('rp-search-bar').addEventListener('rpSearchChange', (e) => {
    console.log(e.detail.value);
  });
</script>
```

### `<rp-recipe-card>`

Recipe summary card.

| Prop          | Type      | Notes                    |
| ------------- | --------- | ------------------------- |
| `recipeId`    | `string`  | required                  |
| `recipeTitle` | `string`  | required                  |
| `image`       | `string`  | optional thumbnail        |
| `category`    | `string`  | optional                  |
| `area`        | `string`  | optional cuisine          |
| `favorite`    | `boolean` | default `false`           |
| `clickable`   | `boolean` | default `true`            |

Events: `rpCardClick` (`{ recipeId }`), `rpFavoriteToggle` (`{ recipeId, favorite }`).
Slot: default — extra actions rendered under the tags (e.g. an "Add to plan" button).

```html
<rp-recipe-card recipe-id="52772" recipe-title="Teriyaki Chicken" category="Chicken" area="Japanese">
  <button slot="action">Add to plan</button>
</rp-recipe-card>
```

### `<rp-day-slot>`

One day of the weekly meal planner.

| Prop           | Type     | Notes                         |
| -------------- | -------- | ------------------------------ |
| `day`          | `string` | required, e.g. `"Monday"`      |
| `recipeTitle`  | `string` | assigned recipe, if any        |
| `recipeImage`  | `string` | assigned recipe's image        |

Event: `rpRemoveMeal` (`{ day }`).
Slot: default — rendered only while the day is empty (e.g. an "Assign recipe" control).

### `<rp-badge>`

Small pill/chip for tags, categories, cuisines.

| Prop      | Type                                                              | Default     |
| --------- | ------------------------------------------------------------------ | ----------- |
| `label`   | `string`                                                            | required    |
| `variant` | `'default' \| 'category' \| 'area' \| 'success' \| 'warning'`      | `'default'` |

Slot: default — prefix icon.

### `<rp-empty-state>`

Generic empty-state placeholder.

| Prop      | Type     | Default |
| --------- | -------- | ------- |
| `heading` | `string` | required |
| `message` | `string` | optional |
| `icon`    | `string` | `'🍽️'`  |

Slot: default — call-to-action button/link.

## Development

```sh
npm install
npx playwright install chromium-headless-shell   # one-time, needed before `npm test`
npm start        # dev build + watch + local demo server
npm run build     # production build (dist/ + loader/)
npm test          # unit + browser component tests (Vitest + Playwright)
```

> `npm install` does not download Playwright's browser binary. Skipping the `playwright install` step will make `npm test` fail with `Executable doesn't exist ... chrome-headless-shell.exe`.

## Publishing

```sh
npm login
npm run build
npm publish --access public
```

Follows semver: `1.0.0` was the first stable release; see the [npm page](https://www.npmjs.com/package/@anchalmehta/recipe-ui-components) for the current version.
