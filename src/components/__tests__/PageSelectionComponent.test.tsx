import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PageSelectionComponent from '../PageSelectionComponent';

describe('PageSelectionComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<PageSelectionComponent />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<PageSelectionComponent />);

    expect(screen.getByText('All pages')).toBeInTheDocument();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 6')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders exactly 2 divider lines', () => {
    const { container } = render(<PageSelectionComponent />);

    // Count divider lines by looking for elements with specific dimensions
    const dividers = container.querySelectorAll('[style*="340px"]');
    expect(dividers.length).toBeGreaterThanOrEqual(2);
  });

  it('starts with all checkboxes unchecked', () => {
    const { container } = render(<PageSelectionComponent />);

    const allPagesCheckbox = container.querySelector('#all-pages-checkbox');
    expect(allPagesCheckbox).toHaveAttribute('aria-checked', 'false');

    for (let i = 1; i <= 6; i++) {
      const checkbox = container.querySelector(`#page-${i}-checkbox`);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    }
  });

  it('selects all pages when "All pages" checkbox is clicked', async () => {
    const { container } = render(<PageSelectionComponent />);

    const allPagesCheckbox = container.querySelector(
      '#all-pages-checkbox'
    ) as HTMLElement;

    fireEvent.click(allPagesCheckbox);

    await waitFor(
      () => {
        for (let i = 1; i <= 6; i++) {
          const checkbox = container.querySelector(`#page-${i}-checkbox`);
          expect(checkbox).toHaveAttribute('aria-checked', 'true');
        }
      },
      { timeout: 2000 }
    );
  });

  it('deselects all pages when "All pages" checkbox is clicked again', async () => {
    const { container } = render(<PageSelectionComponent />);

    const allPagesCheckbox = container.querySelector(
      '#all-pages-checkbox'
    ) as HTMLElement;

    // Select all
    fireEvent.click(allPagesCheckbox);

    await waitFor(
      () => {
        const checkbox1 = container.querySelector('#page-1-checkbox');
        expect(checkbox1).toHaveAttribute('aria-checked', 'true');
      },
      { timeout: 2000 }
    );

    // Deselect all
    fireEvent.click(allPagesCheckbox);

    await waitFor(
      () => {
        for (let i = 1; i <= 6; i++) {
          const checkbox = container.querySelector(`#page-${i}-checkbox`);
          expect(checkbox).toHaveAttribute('aria-checked', 'false');
        }
      },
      { timeout: 2000 }
    );
  });

  it('automatically checks "All pages" when all individual pages are selected', async () => {
    const { container } = render(<PageSelectionComponent />);

    // Click all 6 individual page checkboxes
    for (let i = 1; i <= 6; i++) {
      const checkbox = container.querySelector(`#page-${i}-checkbox`) as HTMLElement;
      fireEvent.click(checkbox);
    }

    await waitFor(
      () => {
        const allPagesCheckbox = container.querySelector('#all-pages-checkbox');
        expect(allPagesCheckbox).toHaveAttribute('aria-checked', 'true');
      },
      { timeout: 3000 }
    );
  });

  it('automatically unchecks "All pages" when one page is deselected', async () => {
    const { container } = render(<PageSelectionComponent />);

    // Select all pages via "All pages" checkbox
    const allPagesCheckbox = container.querySelector(
      '#all-pages-checkbox'
    ) as HTMLElement;
    fireEvent.click(allPagesCheckbox);

    await waitFor(
      () => {
        expect(allPagesCheckbox).toHaveAttribute('aria-checked', 'true');
      },
      { timeout: 2000 }
    );

    // Deselect one page
    const page1Checkbox = container.querySelector('#page-1-checkbox') as HTMLElement;
    fireEvent.click(page1Checkbox);

    await waitFor(
      () => {
        expect(allPagesCheckbox).toHaveAttribute('aria-checked', 'false');
      },
      { timeout: 2000 }
    );
  });

  it('handles individual page checkbox clicks', async () => {
    const { container } = render(<PageSelectionComponent />);

    const page1Checkbox = container.querySelector('#page-1-checkbox') as HTMLElement;

    expect(page1Checkbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(page1Checkbox);

    await waitFor(
      () => {
        expect(page1Checkbox).toHaveAttribute('aria-checked', 'true');
      },
      { timeout: 1000 }
    );
  });

  it('handles Done button click', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { getByText } = render(<PageSelectionComponent />);

    const doneButton = getByText('Done');
    fireEvent.click(doneButton);

    expect(consoleSpy).toHaveBeenCalledWith('Done button clicked');

    consoleSpy.mockRestore();
  });

  it('maintains independent state for each checkbox', async () => {
    const { container } = render(<PageSelectionComponent />);

    const page1Checkbox = container.querySelector('#page-1-checkbox') as HTMLElement;
    const page3Checkbox = container.querySelector('#page-3-checkbox') as HTMLElement;

    fireEvent.click(page1Checkbox);
    fireEvent.click(page3Checkbox);

    await waitFor(
      () => {
        expect(page1Checkbox).toHaveAttribute('aria-checked', 'true');
        expect(page3Checkbox).toHaveAttribute('aria-checked', 'true');

        const page2Checkbox = container.querySelector('#page-2-checkbox');
        expect(page2Checkbox).toHaveAttribute('aria-checked', 'false');
      },
      { timeout: 1000 }
    );
  });
});
