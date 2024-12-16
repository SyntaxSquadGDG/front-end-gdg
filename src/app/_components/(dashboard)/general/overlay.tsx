'use client';

import clsx from 'clsx';
import React from 'react';

const OverlayImage = ({
  url = '/images/navbar/background.png',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'absolute inset-0 bg-cover bg-no-repeat mix-blend-multiply z-0',
        className,
      )}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default OverlayImage;

