'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import SearchTable from './search-table';
import { useInfiniteQuery } from '@tanstack/react-query';
import DataFetching from '../general/data-fetching';
import { fetchSearchResults } from './data/queries';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';
import HeadBar from '../general/head-bar';
import { usePathname } from 'next/navigation';

const SearchResults = ({ query }) => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const pathName = usePathname();

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: ({ pageParam = 1 }) => {
      return fetchSearchResults(query, pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  const results = data?.pages?.flat() || [];

  const errorText = getErrorText(
    t,
    `search.errors.${error?.message}`,
    `search.errors.SEARCH_ERROR`,
  );

  const items = [{ text: 'Search Results', href: pathName }];

  return (
    <DataFetching
      data={results}
      emptyError={t('search.errors.SEARCH_ZERO_ERROR')}
      error={error && errorText}
      refetch={refetch}
      isLoading={isLoading}>
      <div className={clsx('font-content')}>
        {/* <HeadBar items={items}>
          {t('search.total')} {results && results.length}
        </HeadBar> */}
        <div className="flex items-start sm:items-center justify-between mb-32px flex-col sm:flex-row gap-16px">
          <p className="text-24px font-medium">{t('search.results')}</p>
          <p className="text-20px font-medium">
            {t('search.total')} {results && results.length}
          </p>
        </div>
        <SearchTable
          results={results}
          fetchNext={fetchNextPage}
          hasNext={hasNextPage}
          isFetching={isFetching}
        />
      </div>
    </DataFetching>
  );
};

export default SearchResults;

