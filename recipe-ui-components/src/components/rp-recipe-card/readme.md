# rp-recipe-card



<!-- Auto Generated Below -->


## Overview

A card that displays a recipe summary (image, title, category/area, favorite toggle).
Consumers render extra actions (e.g. an "Add to plan" button) via the default slot.

## Properties

| Property                   | Attribute      | Description                                                      | Type      | Default     |
| -------------------------- | -------------- | ---------------------------------------------------------------- | --------- | ----------- |
| `area`                     | `area`         | Recipe area/cuisine, e.g. "Italian".                             | `string`  | `undefined` |
| `category`                 | `category`     | Recipe category, e.g. "Dessert".                                 | `string`  | `undefined` |
| `clickable`                | `clickable`    | Whether the whole card body is clickable (navigates to details). | `boolean` | `true`      |
| `favorite`                 | `favorite`     | Whether the recipe is currently favorited.                       | `boolean` | `false`     |
| `image`                    | `image`        | Recipe thumbnail image URL.                                      | `string`  | `undefined` |
| `recipeId` _(required)_    | `recipe-id`    | Unique id of the recipe, echoed back in emitted events.          | `string`  | `undefined` |
| `recipeTitle` _(required)_ | `recipe-title` | Recipe title.                                                    | `string`  | `undefined` |


## Events

| Event              | Description                                        | Type                                  |
| ------------------ | -------------------------------------------------- | ------------------------------------- |
| `rpCardClick`      | Fired when the card body is clicked.               | `CustomEvent<RpCardClickDetail>`      |
| `rpFavoriteToggle` | Fired when the favorite (heart) button is toggled. | `CustomEvent<RpFavoriteToggleDetail>` |


## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | The default slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
