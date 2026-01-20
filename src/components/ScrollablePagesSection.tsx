import React from 'react';
import PageItem from './PageItem';
import { DIMENSIONS } from '../constants';

interface ScrollablePagesSectionProps {
  pageSelections: boolean[];
  onPageCheckboxChange: (pageIndex: number) => void;
  checkboxAnimationStates: Map<string, number>;
}

/**
 * Container for 6 page items with scroll functionality
 * Shows 4 pages by default, requires scrolling to view pages 5-6
 */
const ScrollablePagesSection: React.FC<ScrollablePagesSectionProps> = ({ 
  pageSelections, 
  onPageCheckboxChange
}) => {
  const containerStyle: React.CSSProperties = {
    maxHeight: `${DIMENSIONS.scrollableSection.maxHeight}px`,
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  return (
    <div style={containerStyle}>
      {[1, 2, 3, 4, 5, 6].map((pageNumber) => (
        <PageItem
          key={`page-${pageNumber}`}
          pageNumber={pageNumber}
          isChecked={pageSelections[pageNumber - 1] || false}
          onChange={() => onPageCheckboxChange(pageNumber - 1)}
        />
      ))}
    </div>
  );
};

export default ScrollablePagesSection;
