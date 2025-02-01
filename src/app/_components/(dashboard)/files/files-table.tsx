'use client';

import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import FilesTableItem from './files-table-item';

const FilesTable = ({ files, folderName, folderNameRequired = true }) => {
  const t = useTranslations();
  return (
    <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
      <table
        className={clsx(
          'table-auto w-full min-w-[700px] border-collapse',
          'font-content',
          'table',
        )}>
        <thead className="rounded-[32px]">
          <tr className="border-b-solid border-b-tableBorder ">
            <td>{t('files.file')}</td>
            <td>{t('files.fileName')}</td>
            {folderNameRequired && folderName && (
              <td>{t('files.folderName')}</td>
            )}
            <td>{t('files.lastModified')}</td>
            <td>{t('files.size')}</td>
            <td>{t('files.permissions')}</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="">
          {files.map((file) => {
            return (
              <FilesTableItem
                file={file}
                folderName={folderName}
                folderNameRequired={folderNameRequired}
                key={file.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FilesTable;

