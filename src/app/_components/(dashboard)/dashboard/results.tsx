import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import ResultItem from './result-item';
import Card from '../general/card';

const Results = async () => {
  const t = await getTranslations();
  const data = [
    {
      name: 'PDF',
      percentage: 40,
    },
    {
      name: 'Excel',
      percentage: 10,
    },
    {
      name: 'Image',
      percentage: 30,
    },
    {
      name: 'Word',
      percentage: 20,
    },
  ];
  return (
    <Card>
      <div className={clsx(contentFont.className, 'w-[100%]')}>
        <h3 className={clsx('text-[20px] font-medium')}>
          {t('dashboard.latestResults')}
        </h3>
        <p className={clsx('text-[12px] font-medium mt-[8px] mb-[16px]')}>
          {t('dashboard.resultsOverview')}
        </p>
        <ul className="flex flex-col gap-[16px] list-outside">
          {data.map((item, index) => {
            return <ResultItem key={index} item={item} />;
          })}
        </ul>
      </div>
    </Card>
  );
};

export default Results;

