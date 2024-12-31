'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import ActivityItem from './activity-item';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '../general/loader';
import NoToShow from '../general/no-to-show';
import TryLater from '../general/try-later';
import ShowMore from '../general/show-more';
import { fetchManagerActivities } from './data/queries';
import DataFetching from '../general/data-fetching';

const Activity = ({ id, full = false }) => {
  const t = useTranslations();

  const {
    data: activitiesData,
    isLoading: isLoadingActivities,
    isFetching: isFetchingActivities,
    isError: isActivitiesError,
    fetchNextPage: fetchNextActivities,
    hasNextPage: hasNextActivities,
  } = useInfiniteQuery({
    queryKey: ['managersActivities'],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      return fetchManagerActivities(pageParam, 5, id); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;

      const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
  });

  let activities = activitiesData?.pages?.flat() || []; // Flatten the pages to get all activities in one array

  if (!full) {
    activities = activities.slice(0, 5);
  }

  return (
    <DataFetching
      data={activitiesData}
      isError={isActivitiesError}
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

