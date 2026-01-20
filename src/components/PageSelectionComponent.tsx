import React, { useState } from 'react';
import MainWrapper from './MainWrapper';
import DividerLine from './DividerLine';
import HeaderSection from './HeaderSection';

/**
 * Root component for the page selection interface
 * Manages state for all checkboxes and automatic "All pages" logic
 */
const PageSelectionComponent: React.FC = () => {
  const [allPagesSelected, setAllPagesSelected] = useState(false);

  const handleAllPagesCheckboxChange = () => {
    setAllPagesSelected(!allPagesSelected);
  };

  return (
    <MainWrapper>
      <HeaderSection
        isChecked={allPagesSelected}
        onCheckboxChange={handleAllPagesCheckboxChange}
      />
      <DividerLine />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        DividerLine Component Test
      </div>
      <DividerLine />
    </MainWrapper>
  );
};

export default PageSelectionComponent;
