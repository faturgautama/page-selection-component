/**
 * Centralized dimension constants for pixel-perfect accuracy
 */
export interface ComponentDimensions {
    mainWrapper: {
        width: 370;
        height: 326;
        borderWidth: 1;
        borderRadius: 6;
        paddingTop: 10;
        paddingBottom: 10;
    };

    headerSection: {
        paddingTop: 10;
        paddingRight: 15;
        paddingBottom: 10;
        paddingLeft: 15;
    };

    checkbox: {
        width: 25;
        height: 25;
        borderRadius: 6;
        iconWidth: 17;
        iconHeight: 12;
        iconTop: 6;
        iconLeft: 4;
    };

    dividerLine: {
        containerWidth: 370;
        containerHeight: 20;
        lineWidth: 340;
        borderWidth: 0.7;
        paddingTop: 10;
        paddingBottom: 10;
        paddingLeft: 15;
        paddingRight: 15;
    };

    pageItem: {
        paddingTop: 10;
        paddingRight: 15;
        paddingBottom: 10;
        paddingLeft: 15;
    };

    doneButton: {
        width: 340;
        height: 40;
        borderRadius: 4;
        paddingTop: 10;
        paddingBottom: 10;
        paddingLeft: 20;
        paddingRight: 20;
    };

    scrollableSection: {
        maxHeight: 160; // Shows 4 pages by default
    };
}

/**
 * Exact dimension values matching specifications
 */
export const DIMENSIONS: ComponentDimensions = {
    mainWrapper: {
        width: 370,
        height: 326,
        borderWidth: 1,
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
    },

    headerSection: {
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
    },

    checkbox: {
        width: 25,
        height: 25,
        borderRadius: 6,
        iconWidth: 17,
        iconHeight: 12,
        iconTop: 6,
        iconLeft: 4,
    },

    dividerLine: {
        containerWidth: 370,
        containerHeight: 20,
        lineWidth: 340,
        borderWidth: 0.7,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },

    pageItem: {
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
    },

    doneButton: {
        width: 340,
        height: 40,
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },

    scrollableSection: {
        maxHeight: 160,
    },
};

/**
 * Centralized color constants for exact color matching
 */
export interface ColorPalette {
    // Main wrapper
    mainBorder: '#EEEEEE';
    mainShadow1: '#1414141F';
    mainShadow2: '#1414141A';
    mainBackground: '#FFFFFF';

    // Text
    textPrimary: '#1F2128';

    // Divider
    dividerBorder: '#CDCDCD';

    // Checkbox states
    checkboxBorderLight: '#BDBDBD';
    checkboxIconLight: '#E3E3E3';
    checkboxIconDark: '#878787';
    checkboxBackgroundLightBlue: '#5087F8';
    checkboxBackgroundDarkBlue: '#2469F6';
    checkboxIconWhite: '#FFFFFF';

    // Button states
    buttonNormal: '#FFCE22';
    buttonHover: '#FFD84D';
}

/**
 * Exact color values matching specifications
 */
export const COLORS: ColorPalette = {
    // Main wrapper
    mainBorder: '#EEEEEE',
    mainShadow1: '#1414141F',
    mainShadow2: '#1414141A',
    mainBackground: '#FFFFFF',

    // Text
    textPrimary: '#1F2128',

    // Divider
    dividerBorder: '#CDCDCD',

    // Checkbox states
    checkboxBorderLight: '#BDBDBD',
    checkboxIconLight: '#E3E3E3',
    checkboxIconDark: '#878787',
    checkboxBackgroundLightBlue: '#5087F8',
    checkboxBackgroundDarkBlue: '#2469F6',
    checkboxIconWhite: '#FFFFFF',

    // Button states
    buttonNormal: '#FFCE22',
    buttonHover: '#FFD84D',
};

/**
 * Typography constants
 */
export const TYPOGRAPHY = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '130%',
    letterSpacing: 0,
    verticalAlign: 'middle',
} as const;

/**
 * Animation state transition data model
 */
export interface AnimationStateTransition {
    fromState: number;
    toState: number;
    duration: number;
    trigger: 'hover' | 'mousedown' | 'click' | 'auto';
}

/**
 * Checkbox animation state transitions
 */
export const ANIMATION_TRANSITIONS: AnimationStateTransition[] = [
    { fromState: 1, toState: 2, duration: 150, trigger: 'hover' },
    { fromState: 2, toState: 1, duration: 150, trigger: 'hover' },
    { fromState: 2, toState: 3, duration: 100, trigger: 'mousedown' },
    { fromState: 3, toState: 4, duration: 0, trigger: 'click' },      // Instant
    { fromState: 4, toState: 5, duration: 150, trigger: 'auto' },
    { fromState: 5, toState: 6, duration: 100, trigger: 'click' },
    { fromState: 6, toState: 7, duration: 100, trigger: 'auto' },
    { fromState: 7, toState: 8, duration: 100, trigger: 'auto' },
    { fromState: 8, toState: 9, duration: 100, trigger: 'auto' },
    { fromState: 9, toState: 1, duration: 0, trigger: 'auto' },       // Instant
];
