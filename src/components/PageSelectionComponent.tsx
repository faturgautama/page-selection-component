import React, { useState, useEffect } from 'react';
import MainWrapper from './MainWrapper';
import DividerLine from './DividerLine';
import HeaderSection from './HeaderSection';
import ScrollablePagesSection from './ScrollablePagesSection';
import DoneButton from './DoneButton';

/**
 * Root component for the page selection interface
 * Manages state for all checkboxes and automatic "All pages" logic
 */
const PageSelectionComponent: React.FC = () => {
  const [pageSelections, setPageSelections] = useState<boolean[]>([false, false, false, false, false, false]);
  const [allPagesSelected, setAllPagesSelected] = useState(false);
  const [checkboxAnimationStates] = useState<Map<string, number>>(new Map());

  // Update "All pages" state when individual pages change
  useEffect(() => {
    const allSelected = pageSelections.every(selected => selected);
    setAllPagesSelected(allSelected);
  }, [pageSelections]);

  const handleAllPagesCheckboxChange = () => {
    const newState = !allPagesSelected;
    setAllPagesSelected(newState);
    // Set all pages to the new state
    setPageSelections([newState, newState, newState, newState, newState, newState]);
  };

  const handlePageCheckboxChange = (pageIndex: number) => {
    const newSelections = [...pageSelections];
    newSelections[pageIndex] = !newSelections[pageIndex];
    setPageSelections(newSelections);
  };

  const handleDoneButtonClick = () => {
    console.log('Done button clicked');
    console.log('Selected pages:', pageSelections);
    // Future implementation: handle done action
  };

  return (
    <MainWrapper>
      <HeaderSection
        isChecked={allPagesSelected}
        onCheckboxChange={handleAllPagesCheckboxChange}
      />
      <DividerLine />
      <ScrollablePagesSection
        pageSelections={pageSelections}
        onPageCheckboxChange={handlePageCheckboxChange}
        checkboxAnimationStates={checkboxAnimationStates}
      />
      <DividerLine />
      <DoneButton onClick={handleDoneButtonClick} />
    </MainWrapper>
  );
};

export default PageSelectionComponent;
