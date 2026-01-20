import React from 'react';
import { DIMENSIONS, COLORS } from '../constants';

/**
 * Visual separator between sections
 * 
 * Specifications:
 * - Container: 370×20px with padding (10px top/bottom, 15px left/right)
 * - Line: 340px width with 0.7px border (#CDCDCD)
 */
const DividerLine: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    width: `${DIMENSIONS.dividerLine.containerWidth}px`,
    height: `${DIMENSIONS.dividerLine.containerHeight}px`,
    paddingTop: `${DIMENSIONS.dividerLine.paddingTop}px`,
    paddingBottom: `${DIMENSIONS.dividerLine.paddingBottom}px`,
    paddingLeft: `${DIMENSIONS.dividerLine.paddingLeft}px`,
    paddingRight: `${DIMENSIONS.dividerLine.paddingRight}px`,
    boxSizing: 'border-box',
  };

  const lineStyle: React.CSSProperties = {
    width: `${DIMENSIONS.dividerLine.lineWidth}px`,
    height: '0px',
    border: `${DIMENSIONS.dividerLine.borderWidth}px solid ${COLORS.dividerBorder}`,
  };

  return (
    <div style={containerStyle}>
      <div style={lineStyle} />
    </div>
  );
};

export default DividerLine;
