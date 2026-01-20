import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DoneButton from '../DoneButton';
import { DIMENSIONS, COLORS, TYPOGRAPHY } from '../../constants';
import { hexToRgb } from '../../test/helpers';

describe('DoneButton', () => {
  it('renders "Done" text', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    expect(getByText('Done')).toBeInTheDocument();
  });

  it('applies correct button dimensions', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    const styles = window.getComputedStyle(button);

    expect(styles.width).toBe(`${DIMENSIONS.doneButton.width}px`);
    expect(styles.height).toBe(`${DIMENSIONS.doneButton.height}px`);
  });

  it('applies correct border-radius', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    const styles = window.getComputedStyle(button);

    expect(styles.borderRadius).toBe(`${DIMENSIONS.doneButton.borderRadius}px`);
  });

  it('applies correct padding', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    const styles = window.getComputedStyle(button);

    expect(styles.paddingTop).toBe(`${DIMENSIONS.doneButton.paddingTop}px`);
    expect(styles.paddingBottom).toBe(`${DIMENSIONS.doneButton.paddingBottom}px`);
    expect(styles.paddingLeft).toBe(`${DIMENSIONS.doneButton.paddingLeft}px`);
    expect(styles.paddingRight).toBe(`${DIMENSIONS.doneButton.paddingRight}px`);
  });

  it('applies correct typography', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    const styles = window.getComputedStyle(button);

    expect(styles.fontSize).toBe(`${TYPOGRAPHY.fontSize}px`);
    expect(styles.fontWeight).toBe(String(TYPOGRAPHY.fontWeight));
    expect(styles.color).toBe(hexToRgb(COLORS.textPrimary));
  });

  it('starts with normal state background color', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    expect(button.style.backgroundColor).toBe(hexToRgb(COLORS.buttonNormal));
  });

  it('changes background on hover', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');

    fireEvent.mouseEnter(button);
    expect(button.style.backgroundColor).toBe(hexToRgb(COLORS.buttonHover));

    fireEvent.mouseLeave(button);
    expect(button.style.backgroundColor).toBe(hexToRgb(COLORS.buttonNormal));
  });

  it('changes background on mouse down', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');

    fireEvent.mouseDown(button);
    expect(button.style.backgroundColor).toBe(hexToRgb(COLORS.buttonHover));
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has cursor pointer', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    const styles = window.getComputedStyle(button);

    expect(styles.cursor).toBe('pointer');
  });

  it('has no border', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    // jsdom may return 'medium' for border shorthand, check borderStyle instead
    const styles = window.getComputedStyle(button);
    expect(styles.borderStyle).toBe('none');
  });

  it('uses flexbox for centering', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');
    const styles = window.getComputedStyle(button);

    expect(styles.display).toBe('flex');
    expect(styles.alignItems).toBe('center');
    expect(styles.justifyContent).toBe('center');
  });

  it('returns to normal state after mouse up', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<DoneButton onClick={mockOnClick} />);

    const button = getByText('Done');

    fireEvent.mouseDown(button);
    expect(button.style.backgroundColor).toBe(hexToRgb(COLORS.buttonHover));

    fireEvent.mouseUp(button);
    expect(button.style.backgroundColor).toBe(hexToRgb(COLORS.buttonNormal));
  });
});
