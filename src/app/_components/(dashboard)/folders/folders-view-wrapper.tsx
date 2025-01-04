'use client';

import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import DataFetching from '../general/data-fetching';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import StructureView from '../general/structure-view';
import { fetchFolderFolders } from './data/queries';
import Folders from './folders';
import Files from '../files/files';
import { contentFont } from '@app/_utils/fonts';
import FoldersTable from './folders-table';
import FilesTable from '../files/files-table';

const FoldersViewWrapper = ({ children, id, sectionName, folderName }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations();

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['folder'],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchFolderFolders(pageParam, 5, id); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
    });

  // Safely access messages after the data is fetched
  const folders = data?.pages?.flat()[0] || [];

  console.log(folders);

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
              item="Sections"
              data={data}>
              <Folders folders={folders?.folders} sectionName={sectionName} />
            </DataFetching>
          </div>
        </div>

        <div>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('files.files')}
          </p>

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
              <Files files={folders?.files} />
            </DataFetching>
          </div>
        </div>

        {children}
      </div>

      <div>
        <DataFetching
          isError={isError}
          isLoading={isLoading}
          item="Sections"
          data={data}>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('folders.folders')}
          </p>
          <FoldersTable folders={folders?.folders} sectionName={sectionName} />
        </DataFetching>
        <DataFetching
          isError={isError}
          isLoading={isLoading}
          item="Sections"
          data={data}>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('files.files')}
          </p>
          <FilesTable files={folders?.files} folderName={folderName} />
        </DataFetching>
      </div>
    </StructureView>
  );
};

export default FoldersViewWrapper;

