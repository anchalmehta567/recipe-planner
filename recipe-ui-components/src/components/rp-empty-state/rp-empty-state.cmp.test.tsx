import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('rp-empty-state', () => {
  it('renders heading, message and default icon', async () => {
    const { root } = await render(<rp-empty-state heading="No favorites yet" message="Start adding some!" />);
    expect(root).toHaveTextContent('No favorites yet');
    expect(root).toHaveTextContent('Start adding some!');
    expect(root).toHaveTextContent('🍽️');
  });

  it('omits the message paragraph when none is provided', async () => {
    const { root } = await render(<rp-empty-state heading="Nothing here" />);
    expect(root.shadowRoot?.querySelector('.message')).toBeNull();
  });
});
