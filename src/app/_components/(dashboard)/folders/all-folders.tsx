'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import DataFetching from '../general/data-fetching';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import StructureView from '../general/structure-view';
import Folders from './folders';
import { contentFont } from '@app/_utils/fonts';
import FoldersTable from './folders-table';
import { fetchSectionFolders } from '../sections/data/queires';

const AllFolders = () => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations();

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['allfolders'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchSectionFolders(pageParam, 5, 4); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  // Safely access messages after the data is fetched
  const folders = data?.pages?.flat() || [];

  console.log(folders);

  return (
    <StructureView>
      {/* Pass fetched sections to children */}
      <div className={'flex flex-col gap-[32px]'}>
        <div>
          <div
            className={clsx(
              'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px]',
            )}>
            <DataFetching
              isError={isError}
              isLoading={isLoading}
              item="Sections"
              data={data}>
              <Folders
                folders={folders}
                sectionName={null}
                sectionNameRequired={false}
              />
            </DataFetching>
          </div>
        </div>
      </div>

      <div>
        <DataFetching
          isError={isError}
          isLoading={isLoading}
          item="Sections"
          data={data}>
          <FoldersTable
            folders={folders}
            sectionName={null}
            sectionNameRequired={false}
          />
        </DataFetching>
      </div>
    </StructureView>
  );
};

export default AllFolders;

