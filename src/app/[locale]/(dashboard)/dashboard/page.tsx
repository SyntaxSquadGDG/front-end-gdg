import ActivitySection from '@app/_components/activity-logs/activity-section';
import AiTrain from '@app/_components/dashboard/ai-train';
import BarChartPage from '@app/_components/dashboard/bar';
import Results from '@app/_components/dashboard/results';
import Storage from '@app/_components/dashboard/storage';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <div className="flex justify-between items-stretch gap-[16px] xl:flex-row flex-col">
        <Results />
        <Storage />
        <AiTrain />
      </div>
      <div className="flex items-start gap-[40px] mt-[24px] flex-col xl:flex-row">
        <div className="w-[100%] xl:w-[calc(100%-432px)]">
          <h2
            className={clsx(
              'font-medium text-[24px] text-black mb-[68px]',
              contentFont.className,
            )}>
            {t('dashboard.accuracy')}
          </h2>
          <BarChartPage />
        </div>
        <ActivitySection fixed={false} />
      </div>
    </div>
  );
};

export default page;

