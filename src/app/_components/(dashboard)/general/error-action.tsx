'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const ErrorAction = ({ children }) => {
  return (
    <>
      {children && (
        <div
          className={clsx(
            contentFont.className,
            'text-red-400 text-[16px] font-bold',
          )}>
          * {children}
        </div>
      )}
    </>
  );
};

export default ErrorAction;

