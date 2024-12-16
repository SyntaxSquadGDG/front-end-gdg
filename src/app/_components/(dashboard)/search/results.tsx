'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import SearchTable from './search-table';

const SearchResults = () => {
  const t = useTranslations();
  const data = [
    {
      id: 1,
      name: 'FileName',
      score: 90,
      path: 'HR SectionFolder1Folder9',
      type: 'pdf',
    },
    {
      id: 2,
      name: 'FileName',
      score: 50,
      path: 'HR SectionFolder1Folder9',
      type: 'word',
    },
    {
      id: 3,
      name: 'FileName',
      score: 20,
      path: 'HR SectionFolder1Folder9',
      type: 'excel',
    },
  ];

  return (
    <div className={clsx(contentFont.className)}>
      <div className="flex items-center justify-between mb-[32px]">
        <p className="text-[24px] font-medium">{t('search.results')}</p>
        <p className="text-[20px] font-medium">
          {t('search.total')} {data.length}
        </p>
      </div>
      <SearchTable results={data} />
    </div>
  );
};

export default SearchResults;

