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
  ];
  return (
    <div className="my-[32px]">
      <h2
        className={clsx(
          contentFont.className,
          'text-[24px] font-medium mb-[24px]',
        )}>
        {t('permissions.permissions')}
      </h2>

      <div className="rounded-[16px] overflow-x-auto border-[1px] border-solid border-black">
        <table className="permissionsTable">
          <tbody>
            {permissions.map((item) => {
              return (
                <tr key={`${item.type}${item.id}`}>
                  <td className="py-[16px]">
                    <div className="flex items-center gap-[18px] justify-start">
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
                    <div>PEN</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-[10px] justify-end">
                      <DeleteSVG />
                      <p className="text-[20px] text-dangerColor">
                        {t('permissions.remove')}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="py-[16px] px-[24px] flex items-center gap-[16px]">
          <AddSVG />
          <p className="text-[18px]">{t('permissions.addAnother')}</p>
        </div>
      </div>
    </div>
  );
};

export default Permissions;

