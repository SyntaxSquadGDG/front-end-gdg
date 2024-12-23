'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const Button = ({
  variant = 'fill',
  SVG,
  text,
  onClick,
  disabled = false,
  className,
  type = 'button',
  href = '',
  expand = false,
}) => {
  const commonClass = clsx(
    contentFont.className,
    'px-[24px] py-[12px] text-[18px] font-medium rounded-[8px] flex items-center justify-center text-center gap-[8px]',
    expand && 'min-w-[200px]',
    {
      'bg-mainDashboardLinear text-textLight': variant === 'fill',
      'linearMainText border-[1px] border-solid border-mainColor3':
        variant === 'outline',
      'border-none px-0': variant === 'solid',
    },
    className,
  );

  if (type === 'link') {
    return (
      <Link href={href} className={commonClass}>
        <span>{text}</span>
        {SVG && <SVG />}
      </Link>
    );
  }
  return (
    <button onClick={onClick} disabled={disabled} className={commonClass}>
      <span>{text}</span>
      {SVG && <SVG />}
    </button>
  );
};

export default Button;

