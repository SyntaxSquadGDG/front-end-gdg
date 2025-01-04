'use client';

import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSectionFolders } from './data/queires';
import DataFetching from '../general/data-fetching';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import Folders from '../folders/folders';
import SectionTable from './section-table';
import { contentFont } from '@app/_utils/fonts';
import StructureView from '../general/structure-view';

const SectionViewWrapper = ({ children, sectionName, id }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations();

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['sections'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchSectionFolders(pageParam, 5, id); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  // Safely access messages after the data is fetched
  const folders = data?.pages?.flat() || [];

  return (
    <StructureView>
      {/* Pass fetched sections to children */}
      <div className={'flex flex-col gap-[32px]'}>
        <div>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('folders.folders')}
          </p>

          <div
            className={clsx(
              'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px]',
              direction === 'ltr' ? 'xl:mr-[432px]' : 'xl:ml-[432px]',
            )}>
            <DataFetching
              isError={isError}
              isLoading={isLoading}
              item="Folders"
              data={data}>
              <Folders folders={folders} sectionName={sectionName} />
            </DataFetching>
          </div>
        </div>
        {children}
      </div>

      <SectionTable folders={folders} sectionName={sectionName} />
    </StructureView>
  );
};

export default SectionViewWrapper;

