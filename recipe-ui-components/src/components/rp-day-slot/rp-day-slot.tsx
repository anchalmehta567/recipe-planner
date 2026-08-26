import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export interface RpRemoveMealDetail {
  day: string;
}

/**
 * Represents one day of the weekly meal planner. Shows the assigned recipe
 * (if any) or an empty state. When empty, place an "Assign recipe" control
 * in the default slot; it is only rendered while the slot is empty of a meal.
 */
@Component({
  tag: 'rp-day-slot',
  styleUrl: 'rp-day-slot.css',
  shadow: true,
})
export class RpDaySlot {
  /** Day label, e.g. "Monday". */
  @Prop() day!: string;

  /** Title of the recipe assigned to this day, if any. */
  @Prop() recipeTitle?: string;

  /** Image of the recipe assigned to this day, if any. */
  @Prop() recipeImage?: string;

  /** Fired when the user removes the assigned meal. */
  @Event({ eventName: 'rpRemoveMeal' }) removeMeal!: EventEmitter<RpRemoveMealDetail>;

  private onRemove = () => {
    this.removeMeal.emit({ day: this.day });
  };

  render() {
    const hasMeal = !!this.recipeTitle;
    return (
      <div class={{ slot: true, filled: hasMeal }}>
        <div class="day-label">{this.day}</div>
        {hasMeal ? (
          <div class="meal">
            {this.recipeImage && <img src={this.recipeImage} alt={this.recipeTitle} />}
            <span class="meal-title">{this.recipeTitle}</span>
            <button type="button" class="remove-btn" onClick={this.onRemove} aria-label={`Remove meal from ${this.day}`}>
              ✕
            </button>
          </div>
        ) : (
          <div class="empty">
            <slot />
          </div>
        )}
      </div>
    );
  }
}
