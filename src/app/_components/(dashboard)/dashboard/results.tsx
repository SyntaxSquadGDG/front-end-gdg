import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import ResultItem from './result-item';
import Card from '../general/card';
import { fetchFileTypeResults } from './data/queries';
import TryLater from '../general/try-later';
import LoadError from '../general/load-error';
import { getErrorText } from '@app/_utils/translations';
import LoadErrorDiv from '../general/load-error-div';
import RefetchButton from '../general/refetch';
import { refetchTypeResults } from '@app/actions';

const Results = async () => {
  const t = await getTranslations();
  let data;

  try {
    data = await fetchFileTypeResults();
  } catch (error) {
    const errorText = getErrorText(
      t,
      `dashboard.errors.${error?.message}`,
      `dashboard.errors.FILE_TYPE_RESULTS_ERROR`,
    );
    return (
      <LoadErrorDiv>
        <LoadError>{errorText}</LoadError>
        <RefetchButton refetch={refetchTypeResults} />
      </LoadErrorDiv>
    );
  }

  return (
    <>
      <p className={clsx('text-12px font-medium mt-8px mb-16px')}>
        {t('dashboard.resultsOverview')}
      </p>
      <ul className="flex flex-col gap-16px list-outside">
        {data.map((item, index) => {
          return <ResultItem key={index} item={item} />;
        })}
      </ul>
    </>
  );
};

export default Results;

