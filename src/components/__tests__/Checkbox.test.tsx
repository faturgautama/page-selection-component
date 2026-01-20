import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../Checkbox';
import { DIMENSIONS, COLORS } from '../../constants';
import { hexToRgb } from '../../test/helpers';

describe('Checkbox', () => {
  it('renders with correct dimensions', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox') as HTMLElement;
    const styles = window.getComputedStyle(checkbox);

    expect(styles.width).toBe(`${DIMENSIONS.checkbox.width}px`);
    expect(styles.height).toBe(`${DIMENSIONS.checkbox.height}px`);
  });

  it('starts in State 1 (empty/default)', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox') as HTMLElement;
    expect(checkbox.style.backgroundColor).toBe(hexToRgb(COLORS.mainBackground));
  });

  it('has correct border-radius', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox') as HTMLElement;
    const styles = window.getComputedStyle(checkbox);

    expect(styles.borderRadius).toBe(`${DIMENSIONS.checkbox.borderRadius}px`);
  });

  it('has role checkbox', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox');
    expect(checkbox).toHaveAttribute('role', 'checkbox');
  });

  it('has correct aria-checked attribute when unchecked', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('has correct aria-checked attribute when checked', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={true} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('is keyboard accessible with tabIndex', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox');
    expect(checkbox).toHaveAttribute('tabIndex', '0');
  });

  it('calls onChange when clicked', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox') as HTMLElement;
    fireEvent.click(checkbox);

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(mockOnChange).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it('renders SVG icon', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('icon has correct dimensions', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', String(DIMENSIONS.checkbox.iconWidth));
    expect(svg).toHaveAttribute('height', String(DIMENSIONS.checkbox.iconHeight));
  });

  it('handles rapid clicks without crashing', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox') as HTMLElement;

    // Rapid clicks
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    // Should not crash
    expect(checkbox).toBeInTheDocument();
  });

  it('syncs with external isChecked prop changes', async () => {
    const mockOnChange = vi.fn();
    const { container, rerender } = render(
      <Checkbox id="test-checkbox" isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#test-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    // Change prop externally
    rerender(
      <Checkbox id="test-checkbox" isChecked={true} onChange={mockOnChange} />
    );

    await waitFor(() => {
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });
  });
});
