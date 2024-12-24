'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const ItemModalItem = ({
  SVG,
  text,
  onClick = () => {},
  href = '',
  type = 'button',
}) => {
  const itemClassName = 'flex items-center gap-[10px]';
  const textClassName = clsx(
    'text-[20px] text-mainColor1 font-normal',
    contentFont.className,
  );
  if (type === 'button') {
    return (
      <button onClick={onClick} className={itemClassName}>
        <SVG />
        <p className={textClassName}>{text}</p>
      </button>
    );
  }
  return (
    <Link href={href} className={itemClassName}>
      <SVG />
      <p className={textClassName}>{text}</p>
    </Link>
  );
};

export default ItemModalItem;
