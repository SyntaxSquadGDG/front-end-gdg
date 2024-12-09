'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const RegisterActive = ({ activePage }) => {
  const t = useTranslations();
  return (
    <div className="text-textLight">
      <div className="flex items-center">
        <div className="box_parent">
          <div
            className={clsx(
              'box2 px-[40px] py-[12px] pr-[60px] text-textDark text-[18px] font-medium bg-[#DDDDDD]',
              activePage === 1 && 'bg-goldLinear',
            )}>
            {t('forms.register.tab1')}
          </div>
        </div>
        <div className="box_parent ml-[-30px]">
          <div
            className={clsx(
              'box3 px-[40px] py-[12px] pl-[60px] text-textDark text-[18px] font-medium bg-[#DDDDDD]',
              activePage === 2 && 'bg-goldLinear',
            )}>
            {t('forms.register.tab2')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterActive;

