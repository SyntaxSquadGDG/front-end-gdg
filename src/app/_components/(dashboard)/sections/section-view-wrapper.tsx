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
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { isManagerOwner } from '@app/_utils/auth';

const SectionViewWrapper = ({ children, sectionName, id }) => {
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
    queryKey: ['folders', id],
    queryFn: ({ pageParam = 1 }) => {
      return fetchSectionFolders(id, pageParam, paginationPageLimit); // Fetch 5 messages per page
    },
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  // Safely access messages after the data is fetched
  const folders = data?.pages?.flat() || [];

  console.log(folders);

  const errorText = getErrorText(
    t,
    `sections.errors.${error?.message}`,
    `sections.errors.SECTION_FETCH_ERROR`,
  );

  return (
    <StructureView>
      {/* Pass fetched sections to children */}
      <div className={'flex flex-col gap-32px'}>
        <div>
          <p className={clsx(contentFont, 'mb-24px text-22px font-medium')}>
            {t('folders.folders')}
          </p>

          <div
            className={clsx(
              'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-32px',
              isActivitiesAuth
                ? direction === 'ltr'
                  ? 'xl:mr-[432px]'
                  : 'xl:ml-[432px]'
                : '',
            )}>
            <DataFetching
              error={error && errorText}
              isLoading={isLoading}
              emptyError={t('sections.errors.SECTION_ZERO_ERROR')}
              refetch={refetch}
              data={folders}>
              <Folders
                folders={folders}
                sectionName={sectionName}
                parentId={id}
                parentType="section"
              />
            </DataFetching>
          </div>
        </div>
        {isActivitiesAuth && children}
      </div>
      <DataFetching
        error={error && errorText}
        isLoading={isLoading}
        emptyError={t('sections.errors.SECTION_ZERO_ERROR')}
        data={folders}>
        <SectionTable folders={folders} sectionName={sectionName} />
      </DataFetching>
    </StructureView>
  );
};

export default SectionViewWrapper;

