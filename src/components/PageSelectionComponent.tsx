import React, { useState } from 'react';
import MainWrapper from './MainWrapper';
import DividerLine from './DividerLine';
import HeaderSection from './HeaderSection';
import PageItem from './PageItem';
import DoneButton from './DoneButton';

/**
 * Root component for the page selection interface
 * Manages state for all checkboxes and automatic "All pages" logic
 */
const PageSelectionComponent: React.FC = () => {
  const [allPagesSelected, setAllPagesSelected] = useState(false);
  const [page1Selected, setPage1Selected] = useState(false);

  const handleAllPagesCheckboxChange = () => {
    setAllPagesSelected(!allPagesSelected);
  };

  const handlePage1CheckboxChange = () => {
    setPage1Selected(!page1Selected);
  };

  const handleDoneButtonClick = () => {
    console.log('Done button clicked');
    // Future implementation: handle done action
  };

  return (
    <MainWrapper>
      <HeaderSection
        isChecked={allPagesSelected}
        onCheckboxChange={handleAllPagesCheckboxChange}
      />
      <DividerLine />
      <PageItem
        pageNumber={1}
        isChecked={page1Selected}
        onChange={handlePage1CheckboxChange}
      />
      <DividerLine />
      <DoneButton onClick={handleDoneButtonClick} />
    </MainWrapper>
  );
};

export default PageSelectionComponent;
