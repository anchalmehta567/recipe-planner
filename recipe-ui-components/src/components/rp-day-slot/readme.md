# rp-day-slot



<!-- Auto Generated Below -->


## Overview

Represents one day of the weekly meal planner. Shows the assigned recipe
(if any) or an empty state. When empty, place an "Assign recipe" control
in the default slot; it is only rendered while the slot is empty of a meal.

## Properties

| Property           | Attribute      | Description                                       | Type     | Default     |
| ------------------ | -------------- | ------------------------------------------------- | -------- | ----------- |
| `day` _(required)_ | `day`          | Day label, e.g. "Monday".                         | `string` | `undefined` |
| `recipeImage`      | `recipe-image` | Image of the recipe assigned to this day, if any. | `string` | `undefined` |
| `recipeTitle`      | `recipe-title` | Title of the recipe assigned to this day, if any. | `string` | `undefined` |


## Events

| Event          | Description                                    | Type                              |
| -------------- | ---------------------------------------------- | --------------------------------- |
| `rpRemoveMeal` | Fired when the user removes the assigned meal. | `CustomEvent<RpRemoveMealDetail>` |


## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | The default slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
