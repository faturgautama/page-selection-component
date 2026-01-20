import React, { useState, useMemo, useCallback } from 'react';
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
  // State for individual page selections (array of 6 booleans)
  const [pageSelections, setPageSelections] = useState<boolean[]>([
    false, 
    false, 
    false, 
    false, 
    false, 
    false
  ]);

  // State for checkbox animation states (Map<string, number>)
  const [checkboxAnimationStates] = useState<Map<string, number>>(new Map());

  // State for button state (will be used in future tasks)
  // const [buttonState] = useState<'normal' | 'hover' | 'active'>('normal');

  // Derived state for allPagesSelected - automatically calculated from pageSelections
  // This ensures the "All pages" checkbox state is always consistent with individual selections
  const allPagesSelected = useMemo(() => {
    return pageSelections.every(selected => selected);
  }, [pageSelections]);

  /**
   * Handles "All pages" checkbox change
   * When checked: sets all 6 page checkboxes to true
   * When unchecked: sets all 6 page checkboxes to false
   * Uses React's batching to ensure atomic state updates
   */
  const handleAllPagesCheckboxChange = useCallback(() => {
    setPageSelections(prevSelections => {
      const newState = !prevSelections.every(selected => selected);
      return [newState, newState, newState, newState, newState, newState];
    });
  }, []);

  /**
   * Handles individual page checkbox change
   * Toggles the checkbox at the specified index
   * The allPagesSelected state is automatically updated via useMemo
   * Multiple simultaneous calls are handled correctly due to functional state updates
   */
  const handlePageCheckboxChange = useCallback((pageIndex: number) => {
    // Use functional update to ensure we're working with the latest state
    // This protects against race conditions when multiple checkboxes are clicked rapidly
    setPageSelections(prevSelections => {
      const newSelections = [...prevSelections];
      newSelections[pageIndex] = !newSelections[pageIndex];
      return newSelections;
    });
    // Note: updateAllPagesState() is not needed as allPagesSelected is derived via useMemo
  }, []);

  /**
   * Handles Done button click
   */
  const handleDoneButtonClick = () => {
    console.log('Done button clicked');
    console.log('Selected pages:', pageSelections);
    console.log('All pages selected:', allPagesSelected);
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
