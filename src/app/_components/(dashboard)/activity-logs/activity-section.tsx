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

const ActivitySection = ({ type, id, fixed = true }) => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  let hrefValue;

  switch (type) {
    case 'me':
      hrefValue = '/profile/activities';
      break;
    case 'section':
      hrefValue = `/sections/${id}/activities`;
      break;
    case 'folder':
      hrefValue = `/folders/${id}/activities`;
      break;
    case 'file':
      hrefValue = `/files/${id}/activities`;
      break;
    default:
      hrefValue = '/profile/activities';
      break;
  }

  // Use useQuery for data fetching
  const { data, error, isLoading } = useQuery({
    queryKey: ['activities', type, id], // queryKey is now an object property
    queryFn: async () => {
      switch (type) {
        case 'me':
          return await fetchMyActivities(1, 5);
        case 'section':
          return await fetchSectionActivities(1, 5, id);
        case 'folder':
          return await fetchFolderActivities(1, 5, id);
        case 'file':
          return await fetchFileActivities(1, 5, id);
        default:
          throw new Error('Invalid type');
      }
    },
  });

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (error) {
  //   return <LoadError>{t('activity.ACTIVITY_LOAD_ERROR')}</LoadError>;
  // }

  return (
    <div
      className={clsx(
        'w-[100%] rounded-tl-[24px] rounded-br-[24px] shadow-activityLog p-[24px] shrink-0',
        fixed &&
          'xl:fixed xl:top-[230px] xl:h-[calc(100vh-230px-32px)] overflow-y-auto xl:w-[400px]',
        !fixed && 'w-[100%] xl:w-[400px]',
        direction === 'ltr'
          ? fixed && 'xl:right-[32px]'
          : fixed && 'xl:left-[32px]',
      )}>
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
        <ErrorBoundaryWrapper>
          {isLoading && <LoadingSpinner />}
          {error && <LoadError>{t('activity.ACTIVITY_LOAD_ERROR')}</LoadError>}
          {!isLoading &&
            !error &&
            data &&
            data.map((item, index) => <ActivityItem key={index} item={item} />)}
        </ErrorBoundaryWrapper>
      </div>
    </div>
  );
};

export default ActivitySection;

