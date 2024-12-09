'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const HeadText = ({ children, bigSpace = true }) => {
  return (
    <h3
      className={clsx(
        'text-[22px] font-medium',
        contentFont.className,
        bigSpace ? 'mb-[24px]' : 'mb-[16px]',
      )}>
      {children}
    </h3>
  );
};

export default HeadText;

