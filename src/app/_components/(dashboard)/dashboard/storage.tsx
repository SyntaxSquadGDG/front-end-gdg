import React from 'react';
import Card from '../general/card';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import PieChartPage from './storage-pie';
import { contentFont } from '@app/_utils/fonts';

const Storage = async () => {
  const t = await getTranslations();
  return (
    <Card>
      <div className="">
        <h3
          className={clsx(
            'text-[20px] font-medium mb-[18px]',
            contentFont.className,
          )}>
          {t('dashboard.availableStorage')}
        </h3>
        <div className="flex items-center justify-between gap-[32px] md:flex-row flex-col">
          <PieChartPage />
          <div className="flex flex-col gap-[8px] text-[14px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[14px] h-[14px] bg-mainColorPie rounded-full" />
              <p>{t('dashboard.available')}</p>
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="w-[14px] h-[14px] bg-mainColor1 rounded-full" />
              <p>{t('dashboard.used')}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Storage;

