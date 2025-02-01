'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import FoldersTableItem from './folders-table-item';

const FoldersTable = ({ folders, sectionName, sectionNameRequired }) => {
  const t = useTranslations();
  return (
    <div className="tableDiv">
      <table
        className={clsx(
          'table-auto w-full min-w-[700px] border-collapse',
          'font-content',
          'table',
        )}>
        <thead className="rounded-[32px]">
          <tr className="border-b-solid border-b-tableBorder ">
            <td>{t('folders.name')}</td>
            {sectionNameRequired && sectionName && (
              <td>{t('folders.section')}</td>
            )}
            <td>{t('folders.filesCount')}</td>
            <td>{t('folders.lastModified')}</td>
            <td>{t('folders.size')}</td>
            <td>{t('folders.permissions')}</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="">
          {folders.map((folder) => {
            return (
              <FoldersTableItem
                folder={folder}
                sectionName={sectionName}
                sectionNameRequired={sectionNameRequired}
                key={folder.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FoldersTable;

