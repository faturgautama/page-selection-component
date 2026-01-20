import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFontLoading } from '../useFontLoading';

describe('useFontLoading', () => {
  beforeEach(() => {
    // Mock document.fonts API
    if (!document.fonts) {
      Object.defineProperty(document, 'fonts', {
        value: {
          load: vi.fn().mockResolvedValue([]),
          check: vi.fn().mockReturnValue(true),
          ready: Promise.resolve(),
        },
        writable: true,
        configurable: true,
      });
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when font is loaded', async () => {
    const { result } = renderHook(() => useFontLoading());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('handles missing Font Loading API gracefully', async () => {
    // Remove document.fonts temporarily
    const originalFonts = document.fonts;
    Object.defineProperty(document, 'fonts', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFontLoading());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Restore document.fonts
    Object.defineProperty(document, 'fonts', {
      value: originalFonts,
      writable: true,
      configurable: true,
    });
  });

  it('logs warning when font fails to load', async () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Mock font check to return false
    if (document.fonts) {
      vi.spyOn(document.fonts, 'check').mockReturnValue(false);
    }

    renderHook(() => useFontLoading());

    await waitFor(() => {
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Montserrat font failed to load')
      );
    });

    consoleWarn.mockRestore();
  });
});
