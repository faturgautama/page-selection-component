import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PageItem from '../PageItem';
import { DIMENSIONS, COLORS, TYPOGRAPHY } from '../../constants';
import { hexToRgb } from '../../test/helpers';

describe('PageItem', () => {
  it('renders page number correctly', () => {
    const mockOnChange = vi.fn();
    render(<PageItem pageNumber={1} isChecked={false} onChange={mockOnChange} />);

    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });

  it('renders different page numbers', () => {
    const mockOnChange = vi.fn();
    const { rerender } = render(
      <PageItem pageNumber={3} isChecked={false} onChange={mockOnChange} />
    );

    expect(screen.getByText('Page 3')).toBeInTheDocument();

    rerender(<PageItem pageNumber={6} isChecked={false} onChange={mockOnChange} />);
    expect(screen.getByText('Page 6')).toBeInTheDocument();
  });

  it('renders checkbox with correct id', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <PageItem pageNumber={2} isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#page-2-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('passes isChecked prop to checkbox', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <PageItem pageNumber={1} isChecked={true} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#page-1-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('applies correct container styling', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <PageItem pageNumber={1} isChecked={false} onChange={mockOnChange} />
    );

    const itemContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(itemContainer);

    expect(styles.display).toBe('flex');
    expect(styles.alignItems).toBe('center');
    expect(styles.justifyContent).toBe('space-between');
  });

  it('applies correct padding', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <PageItem pageNumber={1} isChecked={false} onChange={mockOnChange} />
    );

    const itemContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(itemContainer);

    expect(styles.paddingTop).toBe(`${DIMENSIONS.pageItem.paddingTop}px`);
    expect(styles.paddingRight).toBe(`${DIMENSIONS.pageItem.paddingRight}px`);
    expect(styles.paddingBottom).toBe(`${DIMENSIONS.pageItem.paddingBottom}px`);
    expect(styles.paddingLeft).toBe(`${DIMENSIONS.pageItem.paddingLeft}px`);
  });

  it('applies correct text styling', () => {
    const mockOnChange = vi.fn();
    const { getByText } = render(
      <PageItem pageNumber={1} isChecked={false} onChange={mockOnChange} />
    );

    const text = getByText('Page 1');
    const styles = window.getComputedStyle(text);

    expect(styles.fontSize).toBe(`${TYPOGRAPHY.fontSize}px`);
    expect(styles.fontWeight).toBe(String(TYPOGRAPHY.fontWeight));
    expect(styles.color).toBe(hexToRgb(COLORS.textPrimary));
  });

  it('renders with unchecked state', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <PageItem pageNumber={1} isChecked={false} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#page-1-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });
});
