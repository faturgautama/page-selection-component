import React from 'react';
import { DIMENSIONS, COLORS } from '../constants';

interface MainWrapperProps {
  children: React.ReactNode;
}

/**
 * Outer container providing border, shadow, and padding
 * Implements exact dimensions: 370×326px with border, border-radius, padding, and box-shadow
 * 
 * Error Handling:
 * - Uses inline styles to ensure rendering works even if external CSS fails to load
 * - All styling is self-contained and does not depend on external stylesheets
 * - Component maintains full functionality with browser default styles as fallback
 */
const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  const style: React.CSSProperties = {
    width: `${DIMENSIONS.mainWrapper.width}px`,
    height: `${DIMENSIONS.mainWrapper.height}px`,
    border: `${DIMENSIONS.mainWrapper.borderWidth}px solid ${COLORS.mainBorder}`,
    borderRadius: `${DIMENSIONS.mainWrapper.borderRadius}px`,
    paddingTop: `${DIMENSIONS.mainWrapper.paddingTop}px`,
    paddingBottom: `${DIMENSIONS.mainWrapper.paddingBottom}px`,
    boxShadow: `0px 8px 15px 0px ${COLORS.mainShadow1}, 0px 0px 4px 0px ${COLORS.mainShadow2}`,
    backgroundColor: COLORS.mainBackground,
    boxSizing: 'border-box',
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default MainWrapper;
