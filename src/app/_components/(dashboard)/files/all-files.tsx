'use client';

import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import DataFetching from '../general/data-fetching';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import StructureView from '../general/structure-view';
import Files from '../files/files';
import { contentFont } from '@app/_utils/fonts';
import FilesTable from '../files/files-table';
import { fetchFolderFolders } from '../folders/data/queries';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { fetchAllFiles } from './data/queries';
import { getErrorText } from '@app/_utils/translations';

const AllFiles = () => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const [errorText, setErrorText] = useState(null);

  const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['allFiles'],
      queryFn: ({ pageParam = 1 }) => {
        return fetchAllFiles(pageParam, paginationPageLimit); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) =>
        getNextPage(lastPage, pages, paginationPageLimit),
    });

  // Safely access messages after the data is fetched
  const files = data?.pages?.flat() || [];

  useEffect(() => {
    const textError = getErrorText(
      t,
      `files.errors.${error?.message}`,
      `files.errors.FILES_LOAD_ERROR`,
    );
    setErrorText(textError);
  }, [error]);

  return (
    <StructureView>
      {/* Pass fetched sections to children */}
      <div className={'flex flex-col gap-32px'}>
        <div>
          <div
            className={clsx(
              'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-32px',
            )}>
            <DataFetching
              error={error && errorText}
              isLoading={isLoading}
              emptyError={t('files.errors.FILES_ZERO_ERROR')}
              data={data}>
              <Files files={files} />
            </DataFetching>
          </div>
        </div>
      </div>

      <div>
        <DataFetching
          error={error && errorText}
          isLoading={isLoading}
          emptyError={t('files.errors.FILES_ZERO_ERROR')}
          data={data}>
          <p className={clsx(contentFont, 'mb-24px text-22px font-medium')}>
            {t('files.files')}
          </p>
          <FilesTable
            files={files}
            folderName={null}
            folderNameRequired={false}
          />
        </DataFetching>
      </div>
    </StructureView>
  );
};

export default AllFiles;

