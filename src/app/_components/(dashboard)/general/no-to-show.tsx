'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import { useTranslations } from 'use-intl';

const NoToShow = ({ children }) => {
  const t = useTranslations();
  return (
    <h2
      className={clsx(
        'text-center text-mainColor1 text-20px font-bold my-32px',
        'font-content',
      )}>
      {t('zero.thereNo')}&nbsp;
      {children}&nbsp;
      {t('zero.toShow')}
    </h2>
  );
};

export default NoToShow;

