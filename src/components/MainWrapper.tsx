import React from 'react';
import { DIMENSIONS, COLORS } from '../constants';

interface MainWrapperProps {
  children: React.ReactNode;
}

/**
 * Outer container providing border, shadow, and padding
 * Implements exact dimensions: 370×326px with border, border-radius, padding, and box-shadow
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
