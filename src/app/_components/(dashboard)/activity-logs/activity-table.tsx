'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import ActivityTableItem from './activity-table-item';
import DataFetching from '../general/data-fetching';
import { fetchActivities } from './data/queries';
import ShowMore from '../general/show-more';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';

const ActivityTable = () => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;

  const {
    data: activitiesData,
    isLoading: isLoadingActivities,
    isFetching: isFetchingActivities,
    error,
    fetchNextPage: fetchNextActivities,
    hasNextPage: hasNextActivities,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['activities'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchActivities(pageParam, paginationPageLimit); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  let activities = activitiesData?.pages?.flat() || []; // Flatten the pages to get all activities in one array

  const errorText = getErrorText(
    t,
    `activity.errors.${error?.message}`,
    `activity.errors.ACTIVITY_LOAD_ERROR`,
  );

  return (
    <DataFetching
      data={activities}
      emptyError={t('activity.errors.ACTIVITY_ZERO_ERROR')}
      error={error && errorText}
      refetch={refetch}
      isLoading={isLoadingActivities}>
      <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
        <table className={clsx('font-content', 'table')}>
          <thead>
            <tr>
              <td></td>
              <td>{t('activity.employeeName')}</td>
              <td>{t('activity.action')}</td>
              <td>{t('activity.item')}</td>
              <td>{t('activity.lastModified')}</td>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              return (
                <ActivityTableItem key={activity.id} activity={activity} />
              );
            })}
          </tbody>
        </table>
        <ShowMore
          hasNext={hasNextActivities}
          isFetching={isFetchingActivities}
          onClick={fetchNextActivities}
        />
      </div>
    </DataFetching>
  );
};

export default ActivityTable;

