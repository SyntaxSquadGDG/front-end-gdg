'use client';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import AddSVG from '@app/_components/svgs/general/add';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import PermissionItem from './permission-item';

const Permissions = () => {
  const t = useTranslations();
  const permissions = [
    {
      type: 'folder',
      name: 'folderName',
      id: 1,
    },
    {
      type: 'section',
      name: 'sectionName',
      id: 1,
    },
    {
      type: 'folder',
      name: 'folderName2',
      id: 2,
    },
    {
      type: 'file',
      name: 'FileName',
      id: 1,
    },
  ];
  const employee = {
    id: 1,
    name: 'Amr',
  };

  return (
    <div className="rounded-[16px] overflow-x-auto border-[1px] border-solid border-black">
      <table className="permissionsTable">
        <tbody>
          {permissions.map((item) => {
            return (
              <PermissionItem
                item={item}
                employee={employee}
                key={`${item.id}${item.type}`}
              />
            );
          })}
        </tbody>
      </table>
      <div className="py-[16px] px-[24px] flex items-center gap-[16px]">
        <AddSVG />
        <p className="text-[18px]">{t('permissions.addAnother')}</p>
      </div>
    </div>
  );
};

export default Permissions;

