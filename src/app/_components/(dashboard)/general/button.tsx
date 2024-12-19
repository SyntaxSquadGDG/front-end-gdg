'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const Button = ({
  variant = 'fill',
  SVG,
  text,
  onClick,
  disabled = false,
  className,
  expand = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        expand && 'min-w-[200px]',
        contentFont.className,
        'px-[24px] py-[12px] text-[18px] font-medium rounded-[8px] flex items-center justify-center text-center gap-[8px]',
        variant === 'fill'
          ? 'bg-mainDashboardLinear text-textLight'
          : variant === 'outline' &&
              'linearMainText border-[1px] border-solid border-mainColor3',
        className,
      )}>
      <span>{text}</span>
      {SVG && <SVG />}
    </button>
  );
};

export default Button;

