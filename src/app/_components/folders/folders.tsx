'use client';
import React from 'react';
import FolderItem from './folder-item';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const Folders = ({ folders, sectionName }) => {
  const t = useTranslations();
  return (
    <div>
      <p className={clsx(contentFont, 'mb-[24px] text-[22px] font-medium')}>
        {t('folders.folders')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px] xl:mr-[432px]">
        {folders &&
          folders.map((folder) => {
            return (
              <FolderItem
                key={folder.id}
                folder={folder}
                sectionName={sectionName}
              />
            );
          })}
        {!folders && <h2>Error While Fetching Folders</h2>}
      </div>
    </div>
  );
};

export default Folders;

