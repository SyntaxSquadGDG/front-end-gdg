'use client';
import React from 'react';
import FolderItem from './folder-item';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { isManagerOwner } from '@app/_utils/auth';

const Folders = ({ folders, sectionName, sectionNameRequired = true }) => {
  const t = useTranslations();
  return (
    <>
      {folders &&
        folders.map((folder) => {
          return (
            <FolderItem
              key={folder.id}
              folder={folder}
              sectionName={sectionName}
              sectionNameRequired={sectionNameRequired}
            />
          );
        })}
      {!folders && <h2>Error While Fetching Folders</h2>}
    </>
  );
};

export default Folders;

