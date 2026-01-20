import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScrollablePagesSection from '../ScrollablePagesSection';
import { DIMENSIONS } from '../../constants';

describe('ScrollablePagesSection', () => {
  const mockPageSelections = [false, false, false, false, false, false];
  const mockOnPageCheckboxChange = vi.fn();
  const mockCheckboxAnimationStates = new Map<string, number>();

  it('renders all 6 page items', () => {
    const { getByText } = render(
      <ScrollablePagesSection
        pageSelections={mockPageSelections}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    expect(getByText('Page 1')).toBeInTheDocument();
    expect(getByText('Page 2')).toBeInTheDocument();
    expect(getByText('Page 3')).toBeInTheDocument();
    expect(getByText('Page 4')).toBeInTheDocument();
    expect(getByText('Page 5')).toBeInTheDocument();
    expect(getByText('Page 6')).toBeInTheDocument();
  });

  it('applies correct max-height for scrolling', () => {
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={mockPageSelections}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    const scrollContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(scrollContainer);

    expect(styles.maxHeight).toBe(`${DIMENSIONS.scrollableSection.maxHeight}px`);
  });

  it('applies correct overflow settings', () => {
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={mockPageSelections}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    const scrollContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(scrollContainer);

    expect(styles.overflowY).toBe('auto');
    expect(styles.overflowX).toBe('hidden');
  });

  it('renders checkboxes with correct ids', () => {
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={mockPageSelections}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    for (let i = 1; i <= 6; i++) {
      const checkbox = container.querySelector(`#page-${i}-checkbox`);
      expect(checkbox).toBeInTheDocument();
    }
  });

  it('passes correct isChecked prop to each page item', () => {
    const selectedPages = [true, false, true, false, false, true];
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={selectedPages}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    const checkbox1 = container.querySelector('#page-1-checkbox');
    const checkbox2 = container.querySelector('#page-2-checkbox');
    const checkbox3 = container.querySelector('#page-3-checkbox');
    const checkbox6 = container.querySelector('#page-6-checkbox');

    expect(checkbox1).toHaveAttribute('aria-checked', 'true');
    expect(checkbox2).toHaveAttribute('aria-checked', 'false');
    expect(checkbox3).toHaveAttribute('aria-checked', 'true');
    expect(checkbox6).toHaveAttribute('aria-checked', 'true');
  });

  it('renders exactly 6 page items', () => {
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={mockPageSelections}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    const scrollContainer = container.firstChild as HTMLElement;
    expect(scrollContainer.children.length).toBe(6);
  });

  it('handles all pages selected', () => {
    const allSelected = [true, true, true, true, true, true];
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={allSelected}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    for (let i = 1; i <= 6; i++) {
      const checkbox = container.querySelector(`#page-${i}-checkbox`);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    }
  });

  it('handles no pages selected', () => {
    const noneSelected = [false, false, false, false, false, false];
    const { container } = render(
      <ScrollablePagesSection
        pageSelections={noneSelected}
        onPageCheckboxChange={mockOnPageCheckboxChange}
        checkboxAnimationStates={mockCheckboxAnimationStates}
      />
    );

    for (let i = 1; i <= 6; i++) {
      const checkbox = container.querySelector(`#page-${i}-checkbox`);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    }
  });
});
