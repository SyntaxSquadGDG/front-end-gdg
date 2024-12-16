'use client';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import AddSVG from '@app/_components/svgs/general/add';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

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
      id: 1,
      action: 'upload',
      lastModified: '2024',
    },
    {
      type: 'folder',
      name: 'folderName2',
      id: 2,
      action: 'upload',
      lastModified: '2024',
    },
  ];

  return (
    <div className="my-[32px]">
      <h2
        className={clsx(
          contentFont.className,
          'text-[24px] font-medium mb-[24px]',
        )}>
        {t('activity.activity')}
      </h2>

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
              return (
                <tr key={`${item.type}${item.id}`}>
                  <td className="py-[16px]">
                    <div className="flex items-center gap-[18px] justify-center">
                      <span>
                        {item.type === 'section' && (
                          <SectionItemPermissionSVG />
                        )}
                        {item.type === 'folder' && <FolderItemPermissionSVG />}
                        {item.type === 'file' && <FileItemPermissionSVG />}
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      {item.action}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      {item.lastModified}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;

