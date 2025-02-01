import React from 'react';
import Card from '../general/card';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import PieChartPage from './storage-pie';
import { contentFont } from '@app/_utils/fonts';
import { fetchStoragePercentages } from './data/queries';
import LoadError from '../general/load-error';
import { getErrorText } from '@app/_utils/translations';
import { refetchStorage } from '@app/actions';
import RefetchButton from '../general/refetch';
import LoadErrorDiv from '../general/load-error-div';

const Storage = async () => {
  const t = await getTranslations();

  let data;

  try {
    data = await fetchStoragePercentages();
  } catch (error) {
    const errorText = getErrorText(
      t,
      `dashboard.errors.${error?.message}`,
      `dashboard.errors.STORAGE_RESULTS_ERROR`,
    );

    return (
      <LoadErrorDiv>
        <LoadError>{errorText}</LoadError>
        <RefetchButton refetch={refetchStorage} />
      </LoadErrorDiv>
    );
  }

  return (
    <div className="flex items-center justify-between gap-32px md:flex-row flex-col">
      <PieChartPage data={data} />
      <div className="flex flex-col gap-8px text-14px">
        <div className="flex items-center gap-8px">
          <div className="w-[14px] h-[14px] bg-mainColorPie rounded-full" />
          <p>{t('dashboard.available')}</p>
        </div>
        <div className="flex items-center gap-8px">
          <div className="w-[14px] h-[14px] bg-mainColor1 rounded-full" />
          <p>{t('dashboard.used')}</p>
        </div>
      </div>
    </div>
  );
};

export default Storage;

