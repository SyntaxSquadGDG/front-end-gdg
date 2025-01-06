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
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { error } from 'console';
import { getErrorText } from '@app/_utils/translations';

const FoldersViewWrapper = ({ children, id, sectionName, folderName }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const [errorTextFolders, setErrorTextFolders] = useState(null);
  const [errorTextFiles, setErrorTextFiles] = useState(null);

  const {
    data: foldersData,
    isLoading: isLoadingFolders,
    isFetching: isFetchingFolders,
    error: foldersError,
    fetchNextPage: fetchNextFolders,
    hasNextPage: hasNextFolders,
  } = useInfiniteQuery({
    queryKey: ['folderFolders', id],
    queryFn: ({ pageParam = 1 }) => {
      return fetchFolderFolders(id, pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  // Safely access messages after the data is fetched
  const folders = foldersData?.pages?.flat() || [];

  const {
    data: filesData,
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
    error: filesError,
    fetchNextPage: fetchNextFiles,
    hasNextPage: hasNextFiles,
  } = useInfiniteQuery({
    queryKey: ['folderFiles', id],
    queryFn: ({ pageParam = 1 }) => {
      return fetchFolderFiles(id, pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  const files = filesData?.pages?.flat() || [];

  useEffect(() => {
    const textError = getErrorText(
      t,
      `folders.errors.${foldersError.message}`,
      `folders.errors.FOLDERS_FETCH_ERROR`,
    );
    setErrorTextFolders(textError);
  }, [foldersError]);

  useEffect(() => {
    const textError = getErrorText(
      t,
      `files.errors.${filesError.message}`,
      `files.errors.FILES_LOAD_ERROR`,
    );
    setErrorTextFiles(textError);
  }, [filesError]);

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
              error={error && errorTextFolders}
              isLoading={isLoadingFolders}
              emptyError={t('folders.errors.FOLDERS_ZERO_ERROR')}
              data={folders}>
              <Folders folders={folders} sectionName={sectionName} />
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
              error={filesError && errorTextFiles}
              isLoading={isLoadingFiles}
              emptyError={t('files.errors.FILES_ZERO_ERROR')}
              data={files}>
              <Files files={files} />
            </DataFetching>
          </div>
        </div>

        {children}
      </div>

      <div>
        <DataFetching
          error={error && errorTextFolders}
          isLoading={isLoadingFolders}
          emptyError={t('folders.errors.FOLDERS_ZERO_ERROR')}
          data={folders}>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('folders.folders')}
          </p>
          <FoldersTable folders={folders} sectionName={sectionName} />
        </DataFetching>
        <DataFetching
          error={filesError && errorTextFiles}
          isLoading={isLoadingFiles}
          emptyError={t('files.errors.FILES_ZERO_ERROR')}
          data={files}>
          <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
            {t('files.files')}
          </p>
          <FilesTable files={files} folderName={folderName} />
        </DataFetching>
      </div>
    </StructureView>
  );
};

export default FoldersViewWrapper;

