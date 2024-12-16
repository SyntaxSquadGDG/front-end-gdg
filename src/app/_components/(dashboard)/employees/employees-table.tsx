'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';

const EmployeesTable = () => {
  const t = useTranslations();
  const employees = [
    {
      id: 1,
      name: 'amr',
      email: 'amr@gmail.com',
      roles: [
        {
          id: 1,
          name: 'HR',
        },
        {
          id: 2,
          name: 'PR',
        },
      ],
    },
    {
      id: 2,
      name: 'ahmed',
      email: 'ahmed@gmail.com',
      roles: [
        {
          id: 1,
          name: 'HHR',
        },
        {
          id: 2,
          name: 'PPR',
        },
      ],
    },
  ];
  return (
    <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
      <table className={clsx(contentFont.className, 'table')}>
        <thead>
          <tr>
            <td></td>
            <td>{t('employees.id')}</td>
            <td>{t('employees.name')}</td>
            <td>{t('employees.roles')}</td>
            <td>{t('employees.email')}</td>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>
                  <div className="w-[36px] h-[36px] shrink-0">
                    <img src="/images/defaults/user.png" alt="" />
                  </div>
                </td>
                <td>
                  <Link href={`/employees/${employee.id}`}>{employee.id}</Link>
                </td>
                <td>{employee.name}</td>
                <td>
                  <div className="flex items-center gap-[8px] justify-center">
                    <ViewSVG />
                    <p>{t('employees.view')}</p>
                  </div>
                </td>
                <td>{employee.email}</td>
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

export default EmployeesTable;

