import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export interface RpFavoriteToggleDetail {
  recipeId: string;
  favorite: boolean;
}

export interface RpCardClickDetail {
  recipeId: string;
}

/**
 * A card that displays a recipe summary (image, title, category/area, favorite toggle).
 * Consumers render extra actions (e.g. an "Add to plan" button) via the default slot.
 */
@Component({
  tag: 'rp-recipe-card',
  styleUrl: 'rp-recipe-card.css',
  shadow: true,
})
export class RpRecipeCard {
  /** Unique id of the recipe, echoed back in emitted events. */
  @Prop() recipeId!: string;

  /** Recipe title. */
  @Prop() recipeTitle!: string;

  /** Recipe thumbnail image URL. */
  @Prop() image?: string;

  /** Recipe category, e.g. "Dessert". */
  @Prop() category?: string;

  /** Recipe area/cuisine, e.g. "Italian". */
  @Prop() area?: string;

  /** Whether the recipe is currently favorited. */
  @Prop() favorite: boolean = false;

  /** Whether the whole card body is clickable (navigates to details). */
  @Prop() clickable: boolean = true;

  /** Fired when the card body is clicked. */
  @Event({ eventName: 'rpCardClick' }) cardClick!: EventEmitter<RpCardClickDetail>;

  /** Fired when the favorite (heart) button is toggled. */
  @Event({ eventName: 'rpFavoriteToggle' }) favoriteToggle!: EventEmitter<RpFavoriteToggleDetail>;

  private onCardClick = () => {
    if (this.clickable) {
      this.cardClick.emit({ recipeId: this.recipeId });
    }
  };

  private onFavoriteClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    this.favoriteToggle.emit({ recipeId: this.recipeId, favorite: !this.favorite });
  };

  render() {
    return (
      <div class="card" onClick={this.onCardClick} role={this.clickable ? 'button' : undefined} tabindex={this.clickable ? 0 : undefined}>
        <div class="media">
          {this.image ? <img src={this.image} alt={this.recipeTitle} loading="lazy" /> : <div class="media-placeholder">🍽️</div>}
          <button
            class={{ 'favorite-btn': true, active: this.favorite }}
            onClick={this.onFavoriteClick}
            aria-pressed={this.favorite ? 'true' : 'false'}
            aria-label={this.favorite ? 'Remove from favorites' : 'Add to favorites'}
            type="button"
          >
            {this.favorite ? '♥' : '♡'}
          </button>
        </div>
        <div class="body">
          <h3 class="title">{this.recipeTitle}</h3>
          <div class="tags">
            {this.category && <span class="tag tag-category">{this.category}</span>}
            {this.area && <span class="tag tag-area">{this.area}</span>}
          </div>
          <div class="actions">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
