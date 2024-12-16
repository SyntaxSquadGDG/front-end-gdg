'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import Link from 'next/link';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import AddSVG from '@app/_components/svgs/general/add';

const Employees = () => {
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
    <div className="my-[32px]">
      <h2
        className={clsx(
          contentFont.className,
          'text-[24px] font-medium mb-[24px]',
        )}>
        {t('employees.employees')}
      </h2>

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
              return (
                <tr key={employee.id}>
                  <td>
                    <div className="flex items-center justify-center">
                      <img src="/images/defaults/user.png" alt="" />
                    </div>
                  </td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      {employee.id}
                    </Link>
                  </td>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.email}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <DeleteSVG />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="py-[16px] px-[24px] flex items-center gap-[16px]">
          <AddSVG />
          <p className="text-[18px]">{t('roles.addAnother')}</p>
        </div>
      </div>
    </div>
  );
};

export default Employees;

