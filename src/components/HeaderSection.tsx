import React from 'react';

interface HeaderSectionProps {
  isChecked: boolean;
  onCheckboxChange: () => void;
  animationState: number;
}

/**
 * Displays "All pages" label and master checkbox
 */
const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  isChecked, 
  onCheckboxChange, 
  animationState 
}) => {
  return (
    <div>
      {/* Component implementation will be added in subsequent tasks */}
    </div>
  );
};

export default HeaderSection;
