import React from 'react';
import MainWrapper from './MainWrapper';
import DividerLine from './DividerLine';

/**
 * Root component for the page selection interface
 * Manages state for all checkboxes and automatic "All pages" logic
 */
const PageSelectionComponent: React.FC = () => {
  return (
    <MainWrapper>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        MainWrapper Component Test
      </div>
      <DividerLine />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        DividerLine Component Test
      </div>
      <DividerLine />
    </MainWrapper>
  );
};

export default PageSelectionComponent;
