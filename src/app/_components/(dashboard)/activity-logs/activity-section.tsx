'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import ActivityItem from './activity-item';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import { headFont } from '@/app/_utils/fonts';
import { getLangDir } from 'rtl-detect';
import {
  fetchFileActivities,
  fetchFolderActivities,
  fetchMyActivities,
  fetchSectionActivities,
} from './data/queries';
import LoadError from '../general/load-error';
import LoadingSpinner from '../general/loader';
import ErrorBoundaryWrapper from '../general/error-boundary-wrapper';
import DataFetching from '../general/data-fetching';
import { getErrorText } from '@app/_utils/translations';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';

const ActivitySection = ({ type, id, fixed = true }) => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;

  let hrefValue;
  let query;

  switch (type) {
    case 'me':
      hrefValue = '/profile/activities';
      query = fetchMyActivities(1, paginationPageLimit);
      break;
    case 'section':
      hrefValue = `/sections/${id}/activities`;
      query = fetchSectionActivities(id, 1, paginationPageLimit);
      break;
    case 'folder':
      hrefValue = `/folders/${id}/activities`;
      query = fetchFolderActivities(id, 1, paginationPageLimit);
      break;
    case 'file':
      hrefValue = `/files/${id}/activities`;
      query = fetchFileActivities(id, 1, paginationPageLimit, id);
      break;
    default:
      hrefValue = '/profile/activities';
      query = fetchMyActivities(1, paginationPageLimit);
      break;
  }

  // Use useQuery for data fetching
  const { data, error, isLoading } = useQuery({
    queryKey: ['activities', type, id], // queryKey is now an object property
    queryFn: () => query,
  });

  const errorText = getErrorText(
    t,
    `activity.errors.${error?.message}`,
    `activity.errors.ACTIVITY_LOAD_ERROR`,
  );

  return (
    <div
      className={clsx(
        'w-[100%] rounded-tl-[24px] rounded-br-[24px] shadow-activityLog p-[24px]',
        fixed && 'xl:fixed overflow-y-auto xl:w-[400px]',
        !fixed && 'w-[100%] xl:w-[400px]',
        direction === 'ltr'
          ? fixed && 'xl:right-[32px]'
          : fixed && 'xl:left-[32px]',
      )}
      // style={{ height: `${height}px` }}
    >
      <div className="flex justify-between items-center mb-[24px]">
        <p className={clsx(headFont.className, 'text-[22px] font-medium')}>
          {t('activity.activity')}
        </p>
        <Link
          href={hrefValue}
          className={clsx(
            headFont.className,
            'text-[14px] font-bold underline',
          )}>
          {t('general.viewAll')}
        </Link>
      </div>
      <div className="flex flex-col gap-[16px]">
        <DataFetching
          data={data}
          emptyError={t('activity.errors.ACTIVITY_ZERO_ERROR')}
          error={error && errorText}
          isLoading={isLoading}>
          {data &&
            data.map((item, index) => <ActivityItem key={index} item={item} />)}
        </DataFetching>
      </div>
    </div>
  );
};

export default ActivitySection;

