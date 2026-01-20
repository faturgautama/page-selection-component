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
          border: `1px solid ${COLORS.dividerBorder}`,
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
          border: `1px solid ${COLORS.dividerBorder}`,
        };
      case 9: // Return to Empty
        return {
          ...baseStyle,
          backgroundColor: COLORS.mainBackground,
          border: `1px solid ${COLORS.dividerBorder}`,
        };
      default:
        return baseStyle;
    }
  };

  const getIconColor = (): string => {
    switch (currentState) {
      case 1: // Empty/Default - icon not visible
      case 9: // Return to Empty
        return 'transparent';
      case 2: // Hover - Light
      case 8: // Fading
        return COLORS.checkboxIconLight;
      case 3: // Pre-click
        return COLORS.checkboxIconDark;
      case 4: // Transition to Checked
      case 5: // Checked/Active
      case 6: // Transition to Unchecked
        return COLORS.checkboxIconWhite;
      case 7: // Disappearing - fading effect
        return COLORS.checkboxIconWhite;
      default:
        return 'transparent';
    }
  };

  const getIconOpacity = (): number => {
    switch (currentState) {
      case 1: // Empty/Default - icon not visible
      case 9: // Return to Empty
        return 0;
      case 7: // Disappearing - fading effect
        return 0.5;
      default:
        return 1;
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
      <svg
        width={DIMENSIONS.checkbox.iconWidth}
        height={DIMENSIONS.checkbox.iconHeight}
        viewBox="0 0 17 12"
        style={{
          position: 'absolute',
          top: `${DIMENSIONS.checkbox.iconTop}px`,
          left: `${DIMENSIONS.checkbox.iconLeft}px`,
          opacity: getIconOpacity(),
          transition: 'opacity 150ms ease',
        }}
      >
        <path
          d="M1 6L6 11L16 1"
          stroke={getIconColor()}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Checkbox;
