import clsx from 'clsx';
import React from 'react';

const ImageDiv = ({ src, children, direction = 'right' }) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center w-[100%] relative',
        direction === 'right' && 'lg:justify-end',
        direction === 'left' && 'lg:justify-start',
      )}>
      <img src={src} className="w-[auto] max-h-[80vh]" alt="" />
      {children}
    </div>
  );
};

export default ImageDiv;

