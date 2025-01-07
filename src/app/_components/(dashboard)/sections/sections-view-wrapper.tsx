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
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import StructureView from '../general/structure-view';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';
import { isManagerOwner } from '@app/_utils/auth';

const SectionsViewWrapper = ({ children }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const t = useTranslations();
  const isActivitiesAuth = isManagerOwner();

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['sections'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchSections(pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  // Safely access messages after the data is fetched
  const sections = data?.pages?.flat() || [];

  const errorText = getErrorText(
    t,
    `sections.errors.${error?.message}`,
    `sections.errors.SECTIONS_FETCH_ERROR`,
  );

  return (
    <StructureView>
      {/* Pass fetched sections to children */}
      <div className={'flex flex-col gap-[32px]'}>
        <div
          className={clsx(
            'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px]',
            isActivitiesAuth
              ? direction === 'ltr'
                ? 'xl:mr-[432px]'
                : 'xl:ml-[432px]'
              : '',
          )}>
          <DataFetching
            error={error && errorText}
            isLoading={isLoading}
            emptyError={t('sections.errors.SECTIONS_ZERO_ERROR')}
            refetch={refetch}
            data={data}>
            <Sections sections={sections} />
          </DataFetching>
        </div>
        {isActivitiesAuth && children}
      </div>

      <DataFetching
        error={error && errorText}
        isLoading={isLoading}
        emptyError={t('sections.errors.SECTIONS_ZERO_ERROR')}
        refetch={refetch}
        data={data}>
        <SectionsTable sections={sections} />
      </DataFetching>
    </StructureView>
  );
};

export default SectionsViewWrapper;

