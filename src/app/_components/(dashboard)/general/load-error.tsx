'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import { useTranslations } from 'use-intl';

const LoadError = ({ children, className = '' }) => {
  const t = useTranslations();
  return (
    <h2
      className={clsx(
        'text-center text-mainColor1 text-20px font-bold my-32px',
        className,
        'font-content',
      )}>
      {children}
    </h2>
  );
};

export default LoadError;

