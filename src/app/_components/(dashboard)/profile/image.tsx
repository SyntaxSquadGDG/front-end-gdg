'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const ImageSection = () => {
  const t = useTranslations();
  return (
    <div
      className={clsx(contentFont.className, 'flex items-center gap-[24px]')}>
      <div className="w-[80px] h-[80px]">
        <img src="/images/defaults/user.png" className="h-[100%]" alt="" />
      </div>
      <div className="flex items-center gap-[8px]">
        <button
          className={
            'px-[14px] py-[12px] bg-mainColor1 rounded-[8px] text-[12px] text-textLight'
          }>
          {t('profile.image.upload')}
        </button>
        <button
          className={
            'px-[14px] py-[12px] bg-transparent rounded-[8px] text-[12px] text-mainColor1'
          }>
          {t('profile.image.delete')}
        </button>
      </div>
    </div>
  );
};

export default ImageSection;
