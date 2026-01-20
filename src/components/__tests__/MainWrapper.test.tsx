import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainWrapper from '../MainWrapper';
import { DIMENSIONS, COLORS } from '../../constants';
import { hexToRgb } from '../../test/helpers';

describe('MainWrapper', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <MainWrapper>
        <div>Test Content</div>
      </MainWrapper>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct dimensions', () => {
    const { container } = render(
      <MainWrapper>
        <div>Content</div>
      </MainWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(wrapper);

    expect(styles.width).toBe(`${DIMENSIONS.mainWrapper.width}px`);
    expect(styles.height).toBe(`${DIMENSIONS.mainWrapper.height}px`);
  });

  it('applies correct border styling', () => {
    const { container } = render(
      <MainWrapper>
        <div>Content</div>
      </MainWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(wrapper);

    expect(styles.borderRadius).toBe(`${DIMENSIONS.mainWrapper.borderRadius}px`);
    expect(styles.backgroundColor).toBe(hexToRgb(COLORS.mainBackground));
  });

  it('applies correct padding', () => {
    const { container } = render(
      <MainWrapper>
        <div>Content</div>
      </MainWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(wrapper);

    expect(styles.paddingTop).toBe(`${DIMENSIONS.mainWrapper.paddingTop}px`);
    expect(styles.paddingBottom).toBe(`${DIMENSIONS.mainWrapper.paddingBottom}px`);
  });

  it('uses box-sizing border-box', () => {
    const { container } = render(
      <MainWrapper>
        <div>Content</div>
      </MainWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(wrapper);

    expect(styles.boxSizing).toBe('border-box');
  });
});
