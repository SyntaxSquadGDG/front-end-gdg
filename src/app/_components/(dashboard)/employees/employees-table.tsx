'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ViewSVG from '@app/_components/svgs/employees/view';
import EmployeeItemTable from './employee-item-table';

const EmployeesTable = () => {
  const t = useTranslations();
  const employees = [
    {
      id: 1,
      name: 'Amr Shoukry',
      email: 'shoukryworkamr1@gmail.com',
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
    <div className="w-full rounded-[32px] shadow-tableShadow ">
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
            return <EmployeeItemTable employee={employee} key={employee.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;

