'use client';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import AddSVG from '@app/_components/svgs/general/add';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import ActivityItem from './activity-item';

const Activity = () => {
  const t = useTranslations();
  const logs = [
    {
      type: 'folder',
      name: 'folderName',
      id: 1,
      action: 'upload',
      lastModified: '2024',
    },
    {
      type: 'section',
      name: 'sectionName',
      id: 2,
      action: 'upload',
      lastModified: '2024',
    },
    {
      type: 'folder',
      name: 'folderName2',
      id: 3,
      action: 'upload',
      lastModified: '2024',
    },
  ];

  return (
    <div className="rounded-[16px] overflow-x-auto border-[1px] border-solid border-black">
      <table className="activityTable">
        <thead>
          <tr>
            <td>{t('activity.item')}</td>
            <td>{t('activity.action')}</td>
            <td>{t('activity.lastModified')}</td>
          </tr>
        </thead>
        <tbody>
          {logs.map((item) => {
            return <ActivityItem item={item} key={item.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;

