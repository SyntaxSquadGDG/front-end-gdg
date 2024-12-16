'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const MarkAsReadButton = () => {
  const t = useTranslations();
  return (
    <button className={clsx('text-[20px] underline', contentFont.className)}>
      {t('notifications.markAsReadButton')}
    </button>
  );
};

export default MarkAsReadButton;

