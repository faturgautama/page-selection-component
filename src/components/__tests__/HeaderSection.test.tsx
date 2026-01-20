import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeaderSection from '../HeaderSection';
import { DIMENSIONS, COLORS, TYPOGRAPHY } from '../../constants';
import { hexToRgb } from '../../test/helpers';

describe('HeaderSection', () => {
  it('renders "All pages" text', () => {
    const mockOnChange = vi.fn();
    render(<HeaderSection isChecked={false} onCheckboxChange={mockOnChange} />);

    expect(screen.getByText('All pages')).toBeInTheDocument();
  });

  it('renders checkbox with correct id', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <HeaderSection isChecked={false} onCheckboxChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#all-pages-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('passes isChecked prop to checkbox', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <HeaderSection isChecked={true} onCheckboxChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#all-pages-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('applies correct container styling', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <HeaderSection isChecked={false} onCheckboxChange={mockOnChange} />
    );

    const headerContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(headerContainer);

    expect(styles.display).toBe('flex');
    expect(styles.alignItems).toBe('center');
    expect(styles.justifyContent).toBe('space-between');
  });

  it('applies correct padding', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <HeaderSection isChecked={false} onCheckboxChange={mockOnChange} />
    );

    const headerContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(headerContainer);

    expect(styles.paddingTop).toBe(`${DIMENSIONS.headerSection.paddingTop}px`);
    expect(styles.paddingRight).toBe(`${DIMENSIONS.headerSection.paddingRight}px`);
    expect(styles.paddingBottom).toBe(`${DIMENSIONS.headerSection.paddingBottom}px`);
    expect(styles.paddingLeft).toBe(`${DIMENSIONS.headerSection.paddingLeft}px`);
  });

  it('applies correct text styling', () => {
    const mockOnChange = vi.fn();
    const { getByText } = render(
      <HeaderSection isChecked={false} onCheckboxChange={mockOnChange} />
    );

    const text = getByText('All pages');
    const styles = window.getComputedStyle(text);

    expect(styles.fontSize).toBe(`${TYPOGRAPHY.fontSize}px`);
    expect(styles.fontWeight).toBe(String(TYPOGRAPHY.fontWeight));
    expect(styles.color).toBe(hexToRgb(COLORS.textPrimary));
  });

  it('renders with unchecked state', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <HeaderSection isChecked={false} onCheckboxChange={mockOnChange} />
    );

    const checkbox = container.querySelector('#all-pages-checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });
});
