import { Component, Prop, h } from '@stencil/core';

/**
 * A generic empty-state placeholder (no favorites yet, no search results, etc.).
 * Place a call-to-action button/link in the default slot.
 */
@Component({
  tag: 'rp-empty-state',
  styleUrl: 'rp-empty-state.css',
  shadow: true,
})
export class RpEmptyState {
  /** Heading text. */
  @Prop() heading!: string;

  /** Supporting message. */
  @Prop() message?: string;

  /** Emoji or short glyph shown above the heading. */
  @Prop() icon: string = '🍽️';

  render() {
    return (
      <div class="empty-state">
        <div class="icon">{this.icon}</div>
        <h3 class="heading">{this.heading}</h3>
        {this.message && <p class="message">{this.message}</p>}
        <div class="action">
          <slot />
        </div>
      </div>
    );
  }
}
