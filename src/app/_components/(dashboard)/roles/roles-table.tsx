'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import RoleItemTable from './role-item-table';

const RolesTable = () => {
  const t = useTranslations();
  const roles = [
    {
      id: 1,
      name: 'HR',
      employeesCount: 8,
    },
    {
      id: 2,
      name: 'PR',
      employeesCount: 9,
    },
  ];
  return (
    <div className="w-full rounded-[32px] shadow-tableShadow">
      <table className={clsx(contentFont.className, 'table')}>
        <thead>
          <tr>
            <td></td>
            <td>{t('roles.id')}</td>
            <td>{t('roles.name')}</td>
            <td>{t('roles.members')}</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            return <RoleItemTable role={role} key={role.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;

