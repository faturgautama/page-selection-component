import React from 'react';

interface MainWrapperProps {
  children: React.ReactNode;
}

/**
 * Outer container providing border, shadow, and padding
 */
const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default MainWrapper;
