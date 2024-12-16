import React from 'react';
import Card from '../general/card';
import { getTranslations } from 'next-intl/server';
import { contentFont } from '@app/_utils/fonts';
import TrainButton from './train-button';
import Image from 'next/image';
import clsx from 'clsx';

const AiTrain = async () => {
  const t = await getTranslations();
  return (
    <Card>
      <div className="flex items-center md:justify-between h-[100%] flex-col justify-center md:flex-row gap-[40px] w-[100%]">
        <div className="flex-grow flex flex-col justify-between md:items-start gap-[40px] items-center">
          <h3
            className={clsx('text-[20px] font-medium', contentFont.className)}>
            {t('dashboard.enhance')}
          </h3>
          <TrainButton />
        </div>
        <div className={''}>
          <img src="/images/dashboard/ai-hand.png" className="" alt="" />
        </div>
      </div>
    </Card>
  );
};

export default AiTrain;

