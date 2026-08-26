# rp-search-bar



<!-- Auto Generated Below -->


## Overview

A debounced search input. Emits `rpSearchChange` as the user types (debounced)
and `rpSearchSubmit` immediately on Enter/form submit.
Use the `icon` slot to override the default search icon.

## Properties

| Property      | Attribute     | Description                                               | Type     | Default               |
| ------------- | ------------- | --------------------------------------------------------- | -------- | --------------------- |
| `debounce`    | `debounce`    | Debounce delay in ms before rpSearchChange fires.         | `number` | `300`                 |
| `placeholder` | `placeholder` | Placeholder text.                                         | `string` | `'Search recipes...'` |
| `value`       | `value`       | Current value of the input (controlled from the outside). | `string` | `''`                  |


## Events

| Event            | Description                                               | Type                                |
| ---------------- | --------------------------------------------------------- | ----------------------------------- |
| `rpSearchChange` | Fired (debounced) whenever the input value changes.       | `CustomEvent<RpSearchChangeDetail>` |
| `rpSearchSubmit` | Fired immediately when the user presses Enter or submits. | `CustomEvent<RpSearchChangeDetail>` |


## Slots

| Slot     | Description |
| -------- | ----------- |
| `"icon"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
