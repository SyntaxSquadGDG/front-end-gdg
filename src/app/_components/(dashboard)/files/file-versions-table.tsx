'use client';

import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import FileVersionsTableItem from './file-versions-table-item';
import ShowMore from '../general/show-more';

const FileVersionsTable = ({
  fileId,
  versions,
  hasNext,
  isFetching,
  onClick,
}) => {
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
          <tr className="font-semibold text-20px border-b-solid border-b-tableBorder ">
            <td>{t('files.uploaded')}</td>
            <td>{t('files.fileName')}</td>
            <td>{t('files.restore')}</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="">
          {versions.map((version, index) => {
            return (
              <FileVersionsTableItem
                fileId={fileId}
                version={version}
                key={version.id}
              />
            );
          })}
        </tbody>
      </table>
      <ShowMore hasNext={hasNext} isFetching={isFetching} onClick={onClick} />
    </div>
  );
};

export default FileVersionsTable;

