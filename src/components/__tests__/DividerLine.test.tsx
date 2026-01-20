import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DividerLine from '../DividerLine';
import { DIMENSIONS } from '../../constants';

describe('DividerLine', () => {
  it('renders without crashing', () => {
    const { container } = render(<DividerLine />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct container dimensions', () => {
    const { container } = render(<DividerLine />);
    const dividerContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(dividerContainer);

    expect(styles.width).toBe(`${DIMENSIONS.dividerLine.containerWidth}px`);
    expect(styles.height).toBe(`${DIMENSIONS.dividerLine.containerHeight}px`);
  });

  it('applies correct container padding', () => {
    const { container } = render(<DividerLine />);
    const dividerContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(dividerContainer);

    expect(styles.paddingTop).toBe(`${DIMENSIONS.dividerLine.paddingTop}px`);
    expect(styles.paddingBottom).toBe(`${DIMENSIONS.dividerLine.paddingBottom}px`);
    expect(styles.paddingLeft).toBe(`${DIMENSIONS.dividerLine.paddingLeft}px`);
    expect(styles.paddingRight).toBe(`${DIMENSIONS.dividerLine.paddingRight}px`);
  });

  it('renders line element with correct width', () => {
    const { container } = render(<DividerLine />);
    const dividerContainer = container.firstChild as HTMLElement;
    const line = dividerContainer.firstChild as HTMLElement;
    const styles = window.getComputedStyle(line);

    expect(styles.width).toBe(`${DIMENSIONS.dividerLine.lineWidth}px`);
    expect(styles.height).toBe('0px');
  });

  it('applies correct border to line', () => {
    const { container } = render(<DividerLine />);
    const dividerContainer = container.firstChild as HTMLElement;
    const line = dividerContainer.firstChild as HTMLElement;

    // Check that border is applied (jsdom converts colors to rgb)
    expect(line.style.border).toContain('solid');
    expect(line.style.border).toContain('rgb(205, 205, 205)');
  });

  it('uses box-sizing border-box', () => {
    const { container } = render(<DividerLine />);
    const dividerContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(dividerContainer);

    expect(styles.boxSizing).toBe('border-box');
  });
});
