'use client';
import React from 'react';
import SetupSVG from '../svgs/dashbaord/setup';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';

const TrainButton = () => {
  const t = useTranslations();

  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-[10px] rounded-[16px] text-[14px] font-bold text-textLight py-[12px] px-[32px] bg-mainColor1',
        contentFont.className,
      )}>
      <SetupSVG />
      <p>{t('dashboard.setupButton')}</p>
    </button>
  );
};

export default TrainButton;

