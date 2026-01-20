import React from 'react';
import Checkbox from './Checkbox';
import { DIMENSIONS, COLORS, TYPOGRAPHY } from '../constants';

interface HeaderSectionProps {
  isChecked: boolean;
  onCheckboxChange: () => void;
}

/**
 * HeaderSection component displaying "All pages" label and master checkbox
 */
const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  isChecked, 
  onCheckboxChange 
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: `${DIMENSIONS.headerSection.paddingTop}px`,
    paddingRight: `${DIMENSIONS.headerSection.paddingRight}px`,
    paddingBottom: `${DIMENSIONS.headerSection.paddingBottom}px`,
    paddingLeft: `${DIMENSIONS.headerSection.paddingLeft}px`,
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
      <span style={textStyle}>All pages</span>
      <Checkbox
        id="all-pages-checkbox"
        isChecked={isChecked}
        onChange={onCheckboxChange}
      />
    </div>
  );
};

export default HeaderSection;
