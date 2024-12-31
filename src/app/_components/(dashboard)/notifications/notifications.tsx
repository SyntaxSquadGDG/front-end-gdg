'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchNotifications } from './data/queries';
import LoadingSpinner from '../general/loader';
import DataFetching from '../general/data-fetching';
import ErrorBoundaryWrapper from '../general/error-boundary-wrapper';
import NotificationItem from './notification-item';

const Notifications = () => {
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchNotifications(pageParam, 5); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  function getNext() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  // Safely access messages after the data is fetched
  const notifications = data?.pages?.flat() || [];

  return (
    <DataFetching
      data={notifications}
      isError={isError}
      isLoading={isLoading}
      item="Notifications">
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

