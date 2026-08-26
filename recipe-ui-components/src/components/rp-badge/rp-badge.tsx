import { Component, Prop, h } from '@stencil/core';

export type RpBadgeVariant = 'default' | 'category' | 'area' | 'success' | 'warning';

/**
 * A small pill/chip used for tags, categories, cuisines and status labels.
 * Use the default slot to prefix the label with an icon.
 */
@Component({
  tag: 'rp-badge',
  styleUrl: 'rp-badge.css',
  shadow: true,
})
export class RpBadge {
  /** Text shown inside the badge. */
  @Prop() label!: string;

  /** Visual style variant. */
  @Prop() variant: RpBadgeVariant = 'default';

  render() {
    return (
      <span class={`badge badge-${this.variant}`}>
        <slot />
        {this.label}
      </span>
    );
  }
}
