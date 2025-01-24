'use client';

import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import HeadText from '../general/headtext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFileVersions } from './data/queries';
import FileVersionsTable from './file-versions-table';
import DataFetching from '../general/data-fetching';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getErrorText } from '@app/_utils/translations';

const FileVersions = ({ id, enabled = true }) => {
  const t = useTranslations();
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['fileVersions', id],
    queryFn: ({ pageParam = 1 }) => {
      return fetchFileVersions(id, pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
    enabled: enabled,
  });

  // Safely access messages after the data is fetched
  const versions = data?.pages?.flat() || [];

  const textError = getErrorText(
    t,
    `files.errors.${error?.message}`,
    `files.errors.FILE_VERSIONS_LOAD_ERROR`,
  );

  console.log(versions);
  console.log(textError);

  return (
    <div>
      <HeadText>{t('files.otherVersions')}</HeadText>
      <DataFetching
        data={versions}
        error={error && textError}
        emptyError={t('files.errors.FILE_VERSIONS_ZERO_ERROR')}
        refetch={refetch}
        isLoading={isLoading}>
        <FileVersionsTable
          fileId={id}
          versions={versions}
          hasNext={hasNextPage}
          isFetching={isFetching}
          onClick={fetchNextPage}
        />
      </DataFetching>
    </div>
  );
};

export default FileVersions;

