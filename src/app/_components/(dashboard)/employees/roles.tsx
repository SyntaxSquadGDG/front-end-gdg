'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import Link from 'next/link';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import AddSVG from '@app/_components/svgs/general/add';
import RoleItemTable from './role-item-table';

const Roles = () => {
  const t = useTranslations();
  const roles = [
    {
      id: 1,
      name: 'HR',
    },
    {
      id: 2,
      name: 'PR',
    },
  ];
  return (
    <div className="w-full rounded-[32px] border-[1px] border-solid border-black overflow-y-hidden overflow-x-auto">
      <table className={clsx(contentFont.className, 'table')}>
        <thead>
          <tr>
            <td></td>
            <td>{t('roles.id')}</td>
            <td>{t('roles.name')}</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            return <RoleItemTable role={role} key={role.id} />;
          })}
        </tbody>
      </table>
      <div className="py-[16px] px-[24px] flex items-center gap-[16px]">
        <AddSVG />
        <p className="text-[18px]">{t('roles.addAnother')}</p>
      </div>
    </div>
  );
};

export default Roles;

