/**
 * Represents the state of a single checkbox
 */
export interface CheckboxState {
    id: string;
    isChecked: boolean;
    animationState: number; // 1-9
}

/**
 * Represents the selection state of all pages
 */
export interface PageSelection {
    pages: boolean[];
    allSelected: boolean;
}

/**
 * Defines transitions between checkbox animation states
 */
export interface AnimationStateTransition {
    fromState: number;
    toState: number;
    duration: number;
    trigger: 'hover' | 'mousedown' | 'click' | 'auto';
}

/**
 * Button state type
 */
export type ButtonState = 'normal' | 'hover' | 'active';

/**
 * Button state configuration
 */
export interface ButtonStateConfig {
    state: ButtonState;
    backgroundColor: string;
}

/**
 * Component state interface
 */
export interface ComponentState {
    pageSelections: boolean[];
    allPagesSelected: boolean;
    checkboxAnimationStates: Map<string, number>;
    buttonState: ButtonState;
}
