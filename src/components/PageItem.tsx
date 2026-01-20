import React from 'react';
import Checkbox from './Checkbox';
import { DIMENSIONS, COLORS, TYPOGRAPHY } from '../constants';

interface PageItemProps {
  pageNumber: number;
  isChecked: boolean;
  onChange: () => void;
}

/**
 * PageItem component displaying individual page label and checkbox
 */
const PageItem: React.FC<PageItemProps> = ({ 
  pageNumber, 
  isChecked, 
  onChange 
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: `${DIMENSIONS.pageItem.paddingTop}px`,
    paddingRight: `${DIMENSIONS.pageItem.paddingRight}px`,
    paddingBottom: `${DIMENSIONS.pageItem.paddingBottom}px`,
    paddingLeft: `${DIMENSIONS.pageItem.paddingLeft}px`,
  };

  const textStyle: React.CSSProperties = {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.fontWeight,
    fontSize: `${TYPOGRAPHY.fontSize}px`,
    lineHeight: TYPOGRAPHY.lineHeight,
    letterSpacing: `${TYPOGRAPHY.letterSpacing}px`,
    verticalAlign: TYPOGRAPHY.verticalAlign,
    color: COLORS.textPrimary,
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <span style={textStyle}>Page {pageNumber}</span>
      <Checkbox
        id={`page-${pageNumber}-checkbox`}
        isChecked={isChecked}
        onChange={onChange}
      />
    </div>
  );
};

export default PageItem;
