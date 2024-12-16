'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';

const ActivityTable = () => {
  const t = useTranslations();
  const logs = [
    {
      id: 1,
      firstName: 'amr',
      lastName: 'shoukry',
      action: 'upload',
      type: 'file',
      name: 'FileName',
      lastModified: '2024',
    },
    {
      id: 2,
      firstName: 'amr',
      lastName: 'shoukry',
      action: 'upload',
      type: 'file',
      name: 'FileName',
      lastModified: '2024',
    },
  ];
  return (
    <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
      <table className={clsx(contentFont.className, 'table')}>
        <thead>
          <tr>
            <td></td>
            <td>{t('activity.employeeName')}</td>
            <td>{t('activity.action')}</td>
            <td>{t('activity.item')}</td>
            <td>{t('activity.lastModified')}</td>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            return (
              <tr key={log.id}>
                <td>
                  <div className="w-[36px] h-[36px] shrink-0">
                    <img src="/images/defaults/user.png" alt="" />
                  </div>
                </td>
                <td>
                  {log.firstName} {log.lastName}
                </td>
                <td>{log.action}</td>
                <td>
                  <div className="flex items-center gap-[18px] justify-center">
                    <span>
                      {log.type === 'section' && <SectionItemPermissionSVG />}
                      {log.type === 'folder' && <FolderItemPermissionSVG />}
                      {log.type === 'file' && <FileItemPermissionSVG />}
                    </span>
                    <span>{log.name}</span>
                  </div>
                </td>
                <td>{log.lastModified}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;

