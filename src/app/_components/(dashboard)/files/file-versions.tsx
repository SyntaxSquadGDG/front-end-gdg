'use client';

import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import HeadText from '../general/headtext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFileVersions } from './data/queries';
import FileVersionsTable from './file-versions-table';
import DataFetching from '../general/data-fetching';

const FileVersions = ({ id, enabled = true }) => {
  const t = useTranslations();

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['fileVersions', id],
      refetchOnWindowFocus: false,
      queryFn: ({ pageParam = 1 }) => {
        return fetchFileVersions(pageParam, 5, id); // Fetch 5 messages per page
      },
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;
        const isLastPage = !hasData || lastPage.length < 5;
        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
      enabled: enabled,
    });

  // Safely access messages after the data is fetched
  const versions = data?.pages?.flat() || [];

  return (
    <div>
      <HeadText>{t('files.otherVersions')}</HeadText>
      <DataFetching
        data={data}
        isError={isError}
        isLoading={isLoading}
        item="Versions">
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

