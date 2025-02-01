'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import ManagerTableItem from './managers-table-item';
import { useInfiniteQuery } from '@tanstack/react-query';

import ShowMore from '@/app/_components/(dashboard)/general/show-more';
import { fetchManagers } from './data/queries';
import DataFetching from '@/app/_components/(dashboard)/general/data-fetching';
import { getErrorText } from '@app/_utils/translations';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';

const ManagersTable = () => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;

  const [sortConfig, setSortConfig] = useState({
    key: 'id', // Default column to sort by
    direction: 'asc', // Default sorting direction
  });

  const {
    data: managersData,
    isLoading: isLoadingManagers,
    isFetching: isFetchingManagers,
    error,
    fetchNextPage: fetchNextManagers,
    hasNextPage: hasNextManagers,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['managers'],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => {
      return fetchManagers(pageParam, paginationPageLimit); // Return initial data if provided
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  const managers = managersData?.pages?.flat() || []; // Flatten the pages to get all managers in one array

  // Sorting function
  const sortedManagers = useMemo(() => {
    const sortedData = [...managers]; // Create a shallow copy to avoid mutation
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [managers, sortConfig]);

  // Handle sorting when a table header is clicked
  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key) {
        // Toggle the direction if the same column is clicked
        return {
          ...prevSortConfig,
          direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        // Default to ascending direction if a new column is clicked
        return { key, direction: 'asc' };
      }
    });
  };

  const errorText = getErrorText(
    t,
    `managers.errors.${error?.message}`,
    `managers.errors.MANAGERS_LOAD_ERROR`,
  );

  return (
    <DataFetching
      data={managers}
      emptyError={t('managers.errors.MANAGERS_ZERO_ERROR')}
      error={error && errorText}
      refetch={refetch}
      isLoading={isLoadingManagers}>
      <div className="tableDiv">
        <div>
          <table className={clsx('font-content', 'table')}>
            <thead>
              <tr>
                <td></td>
                <td
                  onClick={() => handleSort('id')}
                  style={{ cursor: 'pointer' }}>
                  {t('managers.id')}
                  {sortConfig.key === 'id' &&
                    (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </td>
                <td
                  onClick={() => handleSort('firstName')}
                  style={{ cursor: 'pointer' }}>
                  {t('managers.name')}
                  {sortConfig.key === 'name' &&
                    (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </td>
                <td
                  onClick={() => handleSort('email')}
                  style={{ cursor: 'pointer' }}>
                  {t('managers.email')}
                  {sortConfig.key === 'email' &&
                    (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </td>
              </tr>
            </thead>
            <tbody>
              {sortedManagers.map((manager) => {
                return <ManagerTableItem manager={manager} key={manager.id} />;
              })}
            </tbody>
          </table>
        </div>

        <ShowMore
          hasNext={hasNextManagers}
          isFetching={isFetchingManagers}
          onClick={fetchNextManagers}
        />
      </div>
    </DataFetching>
  );
};

export default ManagersTable;

