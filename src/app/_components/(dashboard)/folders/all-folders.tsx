'use client';

import React, { useEffect, useState } from 'react';
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
import { fetchAllFolders } from './data/queries';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';

const AllFolders = () => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const [errorText, setErrorText] = useState(null);

  const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['allfolders'],
      queryFn: ({ pageParam = 1 }) => {
        return fetchAllFolders(pageParam, paginationPageLimit); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) =>
        getNextPage(lastPage, pages, paginationPageLimit),
    });

  // Safely access messages after the data is fetched
  const folders = data?.pages?.flat() || [];

  useEffect(() => {
    const errorText = getErrorText(
      t,
      `folders.errors.${error?.message}`,
      `folders.errors.FOLDERS_FETCH_ERROR`,
    );

    setErrorText(errorText);
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
              emptyError={t('folders.errors.FOLDERS_ZERO_ERROR')}
              isLoading={isLoading}
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
          error={error && errorText}
          emptyError={t('folders.errors.FOLDERS_ZERO_ERROR')}
          isLoading={isLoading}
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

