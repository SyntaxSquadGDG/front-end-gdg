import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import AiTrain from '@app/_components/(dashboard)/dashboard/ai-train';
import BarChartPage from '@app/_components/(dashboard)/dashboard/bar';
import { fetchCategorizationAccuracy } from '@app/_components/(dashboard)/dashboard/data/queries';
import Results from '@app/_components/(dashboard)/dashboard/results';
import Storage from '@app/_components/(dashboard)/dashboard/storage';
import Card from '@app/_components/(dashboard)/general/card';
import ErrorBoundaryWrapper from '@app/_components/(dashboard)/general/error-boundary-wrapper';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import { contentFont } from '@app/_utils/fonts';
import { getErrorText } from '@app/_utils/translations';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async () => {
  const t = await getTranslations();

  const BarDataWrapper = async () => {
    let data;
    try {
      data = await fetchCategorizationAccuracy();
    } catch (error) {
      const errorText = getErrorText(
        t,
        `dashboard.errors.${error?.message}`,
        `dashboard.errors.CATEGORIZATION_RESULTS_ERROR`,
      );

      return <LoadError>{errorText}</LoadError>;
    }
    return (
      <>
        <BarChartPage data={data} />
      </>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-stretch gap-[16px] xl:flex-row flex-col">
        <Card>
          <div
            className={clsx(
              contentFont.className,
              'w-[100%] flex flex-col justify-start h-[100%]',
            )}>
            <h3 className={clsx('text-[20px] font-medium')}>
              {t('dashboard.latestResults')}
            </h3>

            <ErrorBoundaryWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <Results />
              </Suspense>
            </ErrorBoundaryWrapper>
          </div>
        </Card>
        <Card>
          <div className="h-[100%]">
            <h3
              className={clsx(
                'text-[20px] font-medium mb-[18px]',
                contentFont.className,
              )}>
              {t('dashboard.availableStorage')}
            </h3>

            <ErrorBoundaryWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <Storage />
              </Suspense>
            </ErrorBoundaryWrapper>
          </div>
        </Card>

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
          <ErrorBoundaryWrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <BarDataWrapper />
            </Suspense>
          </ErrorBoundaryWrapper>
        </div>
        <ActivitySection type="me" id={null} fixed={false} />
      </div>
    </div>
  );
};

export default page;

