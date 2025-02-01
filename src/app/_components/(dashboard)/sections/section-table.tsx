'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import FolderListItem from '../folders/folders-table-item';
import SettingsSVG from '@app/_components/svgs/general/settings';

const SectionTable = ({ folders, sectionName }) => {
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
            <td>{t('folders.name')}</td>
            <td>{t('folders.section')}</td>
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
              <FolderListItem
                key={folder.id}
                folder={folder}
                sectionName={sectionName}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SectionTable;

