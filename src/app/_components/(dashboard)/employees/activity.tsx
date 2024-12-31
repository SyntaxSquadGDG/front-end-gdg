'use client';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import AddSVG from '@app/_components/svgs/general/add';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import ActivityItem from './activity-item';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '../general/loader';
import NoToShow from '../general/no-to-show';
import TryLater from '../general/try-later';
import { fetchTypeActivities } from '@app/_utils/fetch/queries';
import ShowMore from '../general/show-more';

const Activity = ({ type, id, full = false }) => {
  const t = useTranslations();

  const {
    data: activitiesData,
    isLoading: isLoadingActivities,
    isFetching: isFetchingActivities,
    isError: isActivitiesError,
    fetchNextPage: fetchNextActivities,
    hasNextPage: hasNextActivities,
  } = useInfiniteQuery({
    queryKey: ['activities'],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      return fetchTypeActivities(pageParam, 5, type, id); // Return initial data if provided
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

  if (isLoadingActivities) {
    return <LoadingSpinner full={false} />;
  }

  if (isActivitiesError) {
    return <TryLater>{t('zero.activities')}</TryLater>;
  }

  console.log(activitiesData);

  if (activities.length === 0) {
    return <NoToShow>{t('zero.activities')}</NoToShow>;
  }

  return (
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
  );
};

export default Activity;

