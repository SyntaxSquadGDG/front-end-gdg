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
import { fetchEmployeeActivities } from '../activity-logs/data/queries';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import DataFetching from '../general/data-fetching';
import { getErrorText } from '@app/_utils/translations';

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
      return fetchEmployeeActivities(id, pageParam, paginationPageLimit); // Return initial data if provided
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
      error={error && errorText}
      data={activitiesData}
      emptyError={t('activity.errors.ACTIVITY_ZERO_ERROR')}
      refetch={refetch}
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

