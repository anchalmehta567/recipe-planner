import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('rp-recipe-card', () => {
  it('emits rpCardClick with the recipe id when clicked', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <rp-recipe-card recipeId="52772" recipeTitle="Teriyaki Chicken" />,
    );
    const clickSpy = spyOnEvent('rpCardClick');

    root.shadowRoot?.querySelector<HTMLDivElement>('.card')?.click();
    await waitForChanges();

    expect(clickSpy).toHaveReceivedEventDetail({ recipeId: '52772' });
  });

  it('does not emit rpCardClick when clickable is false', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <rp-recipe-card recipeId="52772" recipeTitle="Teriyaki Chicken" clickable={false} />,
    );
    const clickSpy = spyOnEvent('rpCardClick');

    root.shadowRoot?.querySelector<HTMLDivElement>('.card')?.click();
    await waitForChanges();

    expect(clickSpy).not.toHaveReceivedEvent();
  });

  it('emits rpFavoriteToggle without triggering rpCardClick', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <rp-recipe-card recipeId="52772" recipeTitle="Teriyaki Chicken" favorite={false} />,
    );
    const clickSpy = spyOnEvent('rpCardClick');
    const favoriteSpy = spyOnEvent('rpFavoriteToggle');

    root.shadowRoot?.querySelector<HTMLButtonElement>('.favorite-btn')?.click();
    await waitForChanges();

    expect(favoriteSpy).toHaveReceivedEventDetail({ recipeId: '52772', favorite: true });
    expect(clickSpy).not.toHaveReceivedEvent();
  });
});
