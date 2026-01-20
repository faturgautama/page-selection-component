import React, { useState } from 'react';
import { DIMENSIONS, COLORS, TYPOGRAPHY } from '../constants';

interface DoneButtonProps {
  onClick: () => void;
}

/**
 * Action button with 3 visual states
 * State 1 (Normal): background #FFCE22
 * State 2 (Hover/Active): background #FFD84D
 * State 3 (After Click): return to State 1 (background #FFCE22)
 * 
 * Error Handling:
 * - Uses inline styles exclusively for CSS loading failure resilience
 * - Maintains full functionality (click, hover) even without external CSS
 * - All visual states are defined programmatically via inline styles
 */
const DoneButton: React.FC<DoneButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleClick = () => {
    onClick();
  };

  // Determine background color based on state
  // State 2 (Hover/Active): triggered by hover or click
  // State 1 (Normal): default state
  const backgroundColor = (isHovered || isActive) ? COLORS.buttonHover : COLORS.buttonNormal;

  // Container to center the button within the 370px MainWrapper
  const containerStyle: React.CSSProperties = {
    width: '370px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '15px',
    paddingRight: '15px',
    boxSizing: 'border-box',
  };

  const buttonStyle: React.CSSProperties = {
    width: `${DIMENSIONS.doneButton.width}px`,
    height: `${DIMENSIONS.doneButton.height}px`,
    borderRadius: `${DIMENSIONS.doneButton.borderRadius}px`,
    paddingTop: `${DIMENSIONS.doneButton.paddingTop}px`,
    paddingBottom: `${DIMENSIONS.doneButton.paddingBottom}px`,
    paddingLeft: `${DIMENSIONS.doneButton.paddingLeft}px`,
    paddingRight: `${DIMENSIONS.doneButton.paddingRight}px`,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.fontWeight,
    fontSize: `${TYPOGRAPHY.fontSize}px`,
    lineHeight: TYPOGRAPHY.lineHeight,
    letterSpacing: `${TYPOGRAPHY.letterSpacing}px`,
    color: COLORS.textPrimary,
    backgroundColor: backgroundColor,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      >
        Done
      </button>
    </div>
  );
};

export default DoneButton;
