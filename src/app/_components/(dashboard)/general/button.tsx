'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import LoadingSpinner from './loader';

const Button = ({
  variant = 'fill',
  SVG,
  text,
  isPendingText,
  isPending = false,
  onClick,
  disabled = false,
  className,
  type = 'button',
  href = '',
  expand = false,
  SVGFirst = false,
}) => {
  const commonClass = clsx(
    'font-content duration-500',
    'px-24px py-12px text-18px font-medium rounded-[8px] flex items-center justify-center text-center gap-8px',
    expand && 'min-w-[200px]',
    variant === 'fill' &&
      'bg-mainDashboardLinear text-textLight hover:opacity-70',
    variant === 'outline' &&
      'border-[1px] border-solid border-mainColor3 hover:bg-mainColor3 hover:text-textLight',
    variant === 'solid' && 'border-none px-[0px] hover:opacity-70',
    className,
  );

  if (type === 'link') {
    return (
      <Link href={href} className={commonClass}>
        <span className={SVGFirst && 'order-2'}>{text}</span>
        {SVG && <SVG />}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={isPending || disabled}
      className={commonClass}>
      {(text || isPendingText) && (
        <span className={SVGFirst && 'order-2'}>
          {isPending ? (isPendingText ? isPendingText : text) : text}
        </span>
      )}
      {/* {isPending && <LoadingSpinner full={false} alignStart={true} />} */}
      {SVG && <SVG />}
    </button>
  );
};

export default Button;

