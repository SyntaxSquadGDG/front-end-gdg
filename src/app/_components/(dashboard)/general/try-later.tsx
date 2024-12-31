'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import { useTranslations } from 'use-intl';

const TryLater = ({ children }) => {
  const t = useTranslations();
  return (
    <h2
      className={clsx(
        'text-center text-mainColor1 text-[20px] font-bold my-[32px]',
        contentFont.className,
      )}>
      {t('zero.loadFail')} {children}. {t('zero.tryLater')}.
    </h2>
  );
};

export default TryLater;

