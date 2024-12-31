'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import { useTranslations } from 'use-intl';

const LoadError = ({ children }) => {
  const t = useTranslations();
  return (
    <h2
      className={clsx(
        'text-center text-mainColor1 text-[20px] font-bold my-[32px]',
        contentFont.className,
      )}>
      {children}
    </h2>
  );
};

export default LoadError;

