'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';

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
    <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
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
            return (
              <tr key={role.id}>
                <td>
                  <div className="w-[36px] h-[36px] shrink-0">
                    <img src="/images/defaults/user.png" alt="" />
                  </div>
                </td>
                <td>
                  <Link href={`/roles/${role.id}`}>{role.id}</Link>
                </td>
                <td>{role.name}</td>
                <td>
                  <div className="flex items-center justify-center gap-[8px]">
                    <ViewSVG />
                    <span>{role.employeesCount}</span>
                  </div>
                </td>
                <td>
                  <div className="flex justify-end items-center">
                    <VerticalDotsSVG />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;

