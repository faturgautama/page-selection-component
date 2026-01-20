import React from 'react';

interface DoneButtonProps {
  onClick: () => void;
}

/**
 * Action button with 3 visual states
 */
const DoneButton: React.FC<DoneButtonProps> = ({ onClick: _onClick }) => {
  return (
    <button>
      {/* Component implementation will be added in subsequent tasks */}
    </button>
  );
};

export default DoneButton;
