/**
 * Test helper functions
 */

/**
 * Converts hex color to RGB format for comparison in tests
 * @param hex - Hex color string (e.g., "#FFFFFF" or "#FFF")
 * @returns RGB color string (e.g., "rgb(255, 255, 255)")
 */
export const hexToRgb = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');

    // Handle 3-digit hex
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Normalizes color string for comparison (converts hex to rgb if needed)
 * @param color - Color string in any format
 * @returns Normalized color string
 */
export const normalizeColor = (color: string): string => {
    if (color.startsWith('#')) {
        return hexToRgb(color);
    }
    return color;
};
