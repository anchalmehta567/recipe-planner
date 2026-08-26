import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('rp-badge', () => {
  it('renders the label with the default variant class', async () => {
    const { root } = await render(<rp-badge label="Dessert" />);
    expect(root.shadowRoot?.querySelector('.badge')).toHaveClass('badge-default');
    expect(root).toHaveTextContent('Dessert');
  });

  it('applies the requested variant class', async () => {
    const { root } = await render(<rp-badge label="Italian" variant="area" />);
    expect(root.shadowRoot?.querySelector('.badge')).toHaveClass('badge-area');
  });
});
