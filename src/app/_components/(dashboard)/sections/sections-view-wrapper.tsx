'use client';

import React, { useState, useEffect } from 'react';
import SectionsView from '@app/_components/(dashboard)/general/sections-view';
import Sections from '@app/_components/(dashboard)/sections/sections';
import SectionsTable from '@app/_components/(dashboard)/sections/sections-table';
import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import { fetcher } from '@app/_utils/fetch/fetch';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSections } from './data/queires';
import DataFetching from '../general/data-fetching';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import StructureView from '../general/structure-view';

const SectionsViewWrapper = ({ children }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['sections'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchSections(pageParam, 5); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  // Safely access messages after the data is fetched
  const sections = data?.pages?.flat() || [];

  return (
    <StructureView>
      {/* Pass fetched sections to children */}
      <div className={'flex flex-col gap-[32px]'}>
        <div
          className={clsx(
            'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px]',
            direction === 'ltr' ? 'xl:mr-[432px]' : 'xl:ml-[432px]',
          )}>
          <DataFetching
            isError={isError}
            isLoading={isLoading}
            item="Sections"
            data={data}>
            <Sections sections={sections} />
          </DataFetching>
        </div>
        {children}
      </div>

      <SectionsTable sections={sections} />
    </StructureView>
  );
};

export default SectionsViewWrapper;

