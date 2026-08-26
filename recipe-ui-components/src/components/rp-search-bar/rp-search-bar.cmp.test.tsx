import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('rp-search-bar', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits rpSearchChange after the debounce delay', async () => {
    const { root, spyOnEvent } = await render(<rp-search-bar debounce={300} />);
    const changeSpy = spyOnEvent('rpSearchChange');

    vi.useFakeTimers();
    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'pasta';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(299);
    expect(changeSpy).not.toHaveReceivedEvent();

    vi.advanceTimersByTime(1);
    expect(changeSpy).toHaveReceivedEventDetail({ value: 'pasta' });
  });

  it('emits rpSearchSubmit immediately on form submit', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(<rp-search-bar />);
    const submitSpy = spyOnEvent('rpSearchSubmit');

    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'curry';
    input.dispatchEvent(new Event('input'));
    await waitForChanges();

    root.shadowRoot?.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true }));
    await waitForChanges();

    expect(submitSpy).toHaveReceivedEventDetail({ value: 'curry' });
  });
});
