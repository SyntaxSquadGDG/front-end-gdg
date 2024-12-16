import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const DescriptionText = ({ children, size = 28 }) => {
  return (
    <p
      className={clsx(
        contentFont.className,
        'text-textLight mt-[32px] mb-[56px]',
      )}
      style={{ fontSize: size }}>
      {children}
    </p>
  );
};

export default DescriptionText;

