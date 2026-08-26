import { Component, Prop, Event, EventEmitter, State, Watch, h } from '@stencil/core';

export interface RpSearchChangeDetail {
  value: string;
}

/**
 * A debounced search input. Emits `rpSearchChange` as the user types (debounced)
 * and `rpSearchSubmit` immediately on Enter/form submit.
 * Use the `icon` slot to override the default search icon.
 */
@Component({
  tag: 'rp-search-bar',
  styleUrl: 'rp-search-bar.css',
  shadow: true,
})
export class RpSearchBar {
  private debounceTimer?: ReturnType<typeof setTimeout>;

  /** Current value of the input (controlled from the outside). */
  @Prop({ mutable: true }) value: string = '';

  /** Placeholder text. */
  @Prop() placeholder: string = 'Search recipes...';

  /** Debounce delay in ms before rpSearchChange fires. */
  @Prop() debounce: number = 300;

  @State() internalValue: string = this.value;

  /** Fired (debounced) whenever the input value changes. */
  @Event({ eventName: 'rpSearchChange' }) searchChange!: EventEmitter<RpSearchChangeDetail>;

  /** Fired immediately when the user presses Enter or submits. */
  @Event({ eventName: 'rpSearchSubmit' }) searchSubmit!: EventEmitter<RpSearchChangeDetail>;

  @Watch('value')
  onValuePropChange(newValue: string) {
    this.internalValue = newValue;
  }

  private onInput = (ev: InputEvent) => {
    const target = ev.target as HTMLInputElement;
    this.internalValue = target.value;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit({ value: this.internalValue });
    }, this.debounce);
  };

  private onSubmit = (ev: Event) => {
    ev.preventDefault();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.searchSubmit.emit({ value: this.internalValue });
  };

  disconnectedCallback() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  render() {
    return (
      <form class="search" onSubmit={this.onSubmit}>
        <span class="icon">
          <slot name="icon">🔍</slot>
        </span>
        <input
          type="search"
          value={this.internalValue}
          placeholder={this.placeholder}
          onInput={this.onInput}
          aria-label={this.placeholder}
        />
      </form>
    );
  }
}
