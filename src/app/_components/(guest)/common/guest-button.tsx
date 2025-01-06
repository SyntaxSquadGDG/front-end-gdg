'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const GuestButton = ({
  children,
  onClick,
  className,
  link,
  href,
  disabled = false,
  variant = 'default',
}) => {
  const commonClass = `${
    variant === 'default'
      ? 'bg-goldLinear text-guestMainColor'
      : variant === 'outline'
      ? 'bg-transparent text-textLight border-[1px] border-solid border-textLight'
      : 'bg-textLight text-guestMainColor'
  } rounded-[16px] px-[24px] xs:px-[70px] py-[18px] text-[20px] font-medium text-center flex justify-center items-center`;

  if (link) {
    return (
      <Link
        href={href}
        className={clsx(commonClass, contentFont.className, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={clsx(commonClass, contentFont.className, className)}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default GuestButton;

