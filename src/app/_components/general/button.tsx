'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const Button = ({ variant = 'fill', text, onClick, expand = false }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        expand && 'min-w-[200px]',
        contentFont.className,
        'px-[24px] py-[12px] text-[18px] font-medium rounded-[16px]',
        variant === 'fill'
          ? 'bg-mainDashboardLinear text-textLight'
          : variant === 'outline' &&
              'linearMainText border-[1px] border-solid border-mainColor3',
      )}>
      {text}
    </button>
  );
};

export default Button;

