'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import { useInfiniteQuery } from '@tanstack/react-query';
import ActivityTableItem from './activity-table-item';
import DataFetching from '../general/data-fetching';
import { fetchActivities } from './data/queries';
import ShowMore from '../general/show-more';

const ActivityTable = () => {
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
      return fetchActivities(pageParam, 5); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;

      const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
  });

  let activities = activitiesData?.pages?.flat() || []; // Flatten the pages to get all activities in one array

  return (
    <DataFetching
      data={activitiesData}
      isError={isActivitiesError}
      isLoading={isLoadingActivities}>
      <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
        <table className={clsx(contentFont.className, 'table')}>
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

