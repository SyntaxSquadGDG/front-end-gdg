'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchNotifications } from './data/queries';
import LoadingSpinner from '../general/loader';
import DataFetching from '../general/data-fetching';
import ErrorBoundaryWrapper from '../general/error-boundary-wrapper';
import NotificationItem from './notification-item';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getErrorText } from '@app/_utils/translations';
import { useTranslations } from 'use-intl';

const Notifications = () => {
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const t = useTranslations();
  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchNotifications(pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  function getNext() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  // Safely access messages after the data is fetched
  const notifications = data?.pages?.flat() || [];

  const errorText = getErrorText(
    t,
    `notifications.errors.${error?.message}`,
    `notifications.errors.NOTIFICATIONS_ERROR`,
  );

  return (
    <DataFetching
      data={notifications}
      error={error && errorText}
      isLoading={isLoading}
      refetch={refetch}
      emptyError={t('notifications.errors.NOTIFICATIONS_ZERO_ERROR')}>
      <div className="flex flex-col gap-[32px]">
        {notifications.map((notification, index) => {
          return (
            <React.Fragment key={index}>
              <NotificationItem
                description={notification.description}
                head={notification.head}
                time={notification.time}
              />
              <div className="bg-secondText opacity-35 h-[1px] w-[100%]" />
            </React.Fragment>
          );
        })}
        {hasNextPage && !isLoading && (
          <button onClick={() => getNext()}>
            {isFetching ? <LoadingSpinner /> : 'Load More'}
          </button>
        )}
      </div>
    </DataFetching>
  );
};

export default Notifications;

