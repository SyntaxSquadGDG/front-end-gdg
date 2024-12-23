'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import Link from 'next/link';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import AddSVG from '@app/_components/svgs/general/add';
import EmployeeItemTable from './employee-item-table';
import ViewSVG from '@app/_components/svgs/employees/view';

const Employees = ({ full }) => {
  const t = useTranslations();
  const employees = [
    {
      id: 1,
      firstName: 'Amr',
      lastName: 'Shoukry',
      email: 'amr@gmail.com',
    },
    {
      id: 2,
      firstName: 'Ahmed',
      lastName: 'Shoukry',
      email: 'ahmed@gmail.com',
    },
  ];
  return (
    <div className="w-full rounded-[32px] border-[1px] border-solid border-black overflow-y-hidden overflow-x-auto">
      <table className={clsx(contentFont.className, 'table')}>
        <thead>
          <tr>
            <td></td>
            <td>{t('employees.id')}</td>
            <td>{t('employees.name')}</td>
            <td>{t('employees.email')}</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return <EmployeeItemTable employee={employee} key={employee.id} />;
          })}
        </tbody>
      </table>
      {!full && (
        <div className="py-[16px] px-[24px] flex items-center gap-[16px] bg-slate-200">
          <ViewSVG />
          <p className="text-[18px]">{t('employees.viewAll')}</p>
        </div>
      )}
    </div>
  );
};

export default Employees;

