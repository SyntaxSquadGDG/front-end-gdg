'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import ActivityItem from './activity-item';
import { useInfiniteQuery } from '@tanstack/react-query';
import ShowMore from '../general/show-more';
import { fetchManagerActivities } from './data/queries';
import DataFetching from '../general/data-fetching';
import { getErrorText } from '@app/_utils/translations';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';

const Activity = ({ type, id, full = false }) => {
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
    queryKey: [`activity${type}${id}`],
    queryFn: ({ pageParam = 1 }) => {
      return fetchManagerActivities(id, pageParam, paginationPageLimit); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  let activities = activitiesData?.pages?.flat() || []; // Flatten the pages to get all activities in one array

  if (!full) {
    activities = activities.slice(0, paginationPageLimit);
  }

  const errorText = getErrorText(
    t,
    `activity.errors.${error?.message}`,
    `activity.errors.ACTIVITY_LOAD_ERROR`,
  );

  return (
    <DataFetching
      data={activities}
      error={error && errorText}
      refetch={refetch}
      emptyError={t('activity.errors.ACTIVITY_ZERO_ERROR')}
      isLoading={isLoadingActivities}>
      <div className="rounded-[16px] overflow-x-auto border-[1px] border-solid border-black">
        <table className="activityTable">
          <thead>
            <tr>
              <td>{t('activity.item')}</td>
              <td>{t('activity.action')}</td>
              <td>{t('activity.lastModified')}</td>
            </tr>
          </thead>
          <tbody>
            {activities.map((item) => {
              return <ActivityItem item={item} key={item.id} />;
            })}
          </tbody>
        </table>
        {full && (
          <ShowMore
            hasNext={hasNextActivities}
            isFetching={isFetchingActivities}
            onClick={fetchNextActivities}
          />
        )}
      </div>
    </DataFetching>
  );
};

export default Activity;

