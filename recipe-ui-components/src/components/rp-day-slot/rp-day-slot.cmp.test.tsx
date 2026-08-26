import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('rp-day-slot', () => {
  it('renders the empty state when no recipe is assigned', async () => {
    const { root } = await render(<rp-day-slot day="Monday" />);
    expect(root.shadowRoot?.querySelector('.slot')).not.toHaveClass('filled');
    expect(root.shadowRoot?.querySelector('.meal')).toBeNull();
  });

  it('renders the assigned meal and emits rpRemoveMeal on remove', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <rp-day-slot day="Tuesday" recipeTitle="Pasta Bolognese" recipeImage="/pasta.jpg" />,
    );
    const removeSpy = spyOnEvent('rpRemoveMeal');

    expect(root.shadowRoot?.querySelector('.slot')).toHaveClass('filled');
    expect(root).toHaveTextContent('Pasta Bolognese');

    root.shadowRoot?.querySelector<HTMLButtonElement>('.remove-btn')?.click();
    await waitForChanges();

    expect(removeSpy).toHaveReceivedEventDetail({ day: 'Tuesday' });
  });
});
