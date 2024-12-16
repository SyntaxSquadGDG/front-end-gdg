import clsx from 'clsx';
import React from 'react';

const OverlaySection = ({ className, fullSection = true }) => {
  return (
    <div
      className={clsx(
        'bg-no-repeat bg-contain bg-left-bottom w-[100%] h-[100%] absolute top-0 left-0 z-[-1]',
        fullSection === true && 'minHeightSection',
        className,
      )}
    />
  );
};

export default OverlaySection;

