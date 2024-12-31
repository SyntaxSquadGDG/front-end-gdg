'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import SearchTable from './search-table';
import { useInfiniteQuery } from '@tanstack/react-query';
import DataFetching from '../general/data-fetching';
import { fetchSearchResults } from './data/queries';

const SearchResults = () => {
  const t = useTranslations();

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['search'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchSearchResults(pageParam, 5); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  const results = data?.pages?.flat() || [];
  console.log(results);

  return (
    <DataFetching
      data={data}
      isError={isError}
      isLoading={isLoading}
      item="Results">
      <div className={clsx(contentFont.className)}>
        <div className="flex items-center justify-between mb-[32px]">
          <p className="text-[24px] font-medium">{t('search.results')}</p>
          <p className="text-[20px] font-medium">
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

