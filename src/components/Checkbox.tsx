import React, { useState, useEffect, useRef } from 'react';
import { DIMENSIONS, COLORS } from '../constants';

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
  animationState?: number;
  id: string;
}

/**
 * Reusable checkbox with 9 animation states
 */
const Checkbox: React.FC<CheckboxProps> = ({ 
  isChecked, 
  onChange, 
  id 
}) => {
  const [currentState, setCurrentState] = useState<number>(1);
  const animationTimeoutRef = useRef<number | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Handle state transitions based on isChecked prop
  useEffect(() => {
    if (isChecked && currentState === 1) {
      // If checked externally and in state 1, jump to state 5
      setCurrentState(5);
    } else if (!isChecked && currentState === 5) {
      // If unchecked externally and in state 5, jump to state 1
      setCurrentState(1);
    }
  }, [isChecked, currentState]);

  const handleMouseEnter = () => {
    if (currentState === 1) {
      setCurrentState(2);
    }
  };

  const handleMouseLeave = () => {
    if (currentState === 2) {
      setCurrentState(1);
    }
  };

  const handleMouseDown = () => {
    if (currentState === 2) {
      setCurrentState(3);
    }
  };

  const handleClick = () => {
    if (currentState === 3 || currentState === 2) {
      // Checking sequence: State 3 → 4 → 5
      setCurrentState(4);
      
      // Instant transition to state 4, then to state 5 after brief delay
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentState(5);
        onChange(); // Notify parent of checked state
      }, 150);
    } else if (currentState === 5) {
      // Unchecking sequence: State 5 → 6 → 7 → 8 → 9 → 1
      setCurrentState(6);
      
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      // State 6 → 7
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentState(7);
        
        // State 7 → 8
        animationTimeoutRef.current = setTimeout(() => {
          setCurrentState(8);
          
          // State 8 → 9
          animationTimeoutRef.current = setTimeout(() => {
            setCurrentState(9);
            
            // State 9 → 1
            animationTimeoutRef.current = setTimeout(() => {
              setCurrentState(1);
              onChange(); // Notify parent of unchecked state
            }, 0);
          }, 100);
        }, 100);
      }, 100);
    }
  };

  const getWrapperStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: `${DIMENSIONS.checkbox.width}px`,
      height: `${DIMENSIONS.checkbox.height}px`,
      borderRadius: `${DIMENSIONS.checkbox.borderRadius}px`,
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 150ms ease, border 150ms ease',
      boxSizing: 'border-box',
    };

    switch (currentState) {
      case 1: // Empty/Default
        return {
          ...baseStyle,
          backgroundColor: COLORS.mainBackground,
          border: 'none',
        };
      case 2: // Hover - Light
        return {
          ...baseStyle,
          backgroundColor: COLORS.mainBackground,
          border: `1px solid ${COLORS.checkboxBorderLight}`,
        };
      case 3: // Pre-click
        return {
          ...baseStyle,
          backgroundColor: COLORS.mainBackground,
          border: `1px solid ${COLORS.checkboxBorderLight}`,
        };
      case 4: // Transition to Checked
        return {
          ...baseStyle,
          backgroundColor: COLORS.checkboxBackgroundLightBlue,
          border: 'none',
          transition: 'background-color 0ms, border 0ms', // Instant transition
        };
      case 5: // Checked/Active
        return {
          ...baseStyle,
          backgroundColor: COLORS.checkboxBackgroundDarkBlue,
          border: 'none',
        };
      case 6: // Transition to Unchecked
        return {
          ...baseStyle,
          backgroundColor: COLORS.checkboxBackgroundLightBlue,
          border: 'none',
        };
      case 7: // Disappearing
        return {
          ...baseStyle,
          backgroundColor: COLORS.checkboxBackgroundDarkBlue,
          border: `1px solid ${COLORS.checkboxBorderLight}`,
        };
      case 8: // Fading
        return {
          ...baseStyle,
          backgroundColor: COLORS.mainBackground,
          border: `1px solid ${COLORS.checkboxBorderLight}`,
        };
      case 9: // Return to Empty
        return {
          ...baseStyle,
          backgroundColor: COLORS.mainBackground,
          border: 'none',
        };
      default:
        return baseStyle;
    }
  };

  const getIconStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: `${DIMENSIONS.checkbox.iconWidth}px`,
      height: `${DIMENSIONS.checkbox.iconHeight}px`,
      position: 'absolute',
      top: `${DIMENSIONS.checkbox.iconTop}px`,
      left: `${DIMENSIONS.checkbox.iconLeft}px`,
      boxSizing: 'border-box',
    };

    // Icon visibility and styling based on state
    switch (currentState) {
      case 1: // Empty/Default - icon not visible
        return {
          ...baseStyle,
          display: 'none',
        };
      case 2: // Hover - Light
        return {
          ...baseStyle,
          border: `1px solid ${COLORS.checkboxIconLight}`,
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          marginTop: '-2px',
        };
      case 3: // Pre-click
        return {
          ...baseStyle,
          border: `1px solid ${COLORS.checkboxIconDark}`,
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          marginTop: '-2px',
        };
      case 4: // Transition to Checked
      case 5: // Checked/Active
      case 6: // Transition to Unchecked
        return {
          ...baseStyle,
          border: `1px solid ${COLORS.checkboxIconWhite}`,
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          marginTop: '-2px',
        };
      case 7: // Disappearing - fading effect
        return {
          ...baseStyle,
          border: `1px solid ${COLORS.checkboxIconWhite}`,
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          marginTop: '-2px',
          opacity: 0.5,
        };
      case 8: // Fading
        return {
          ...baseStyle,
          border: `1px solid ${COLORS.checkboxIconLight}`,
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          marginTop: '-2px',
        };
      case 9: // Return to Empty
        return {
          ...baseStyle,
          display: 'none',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      id={id}
      style={getWrapperStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
    >
      <div style={getIconStyle()} />
    </div>
  );
};

export default Checkbox;
