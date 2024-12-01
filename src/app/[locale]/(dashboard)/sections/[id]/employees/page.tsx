import DeleteSVG from '@/app/_components/svgs/permissions/delete';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const section = {
    name: 'Section Name',
  };

  const employees = [
    {
      id: Math.floor(Math.random() * 10),
      name: 'Ahmed Mohamed',
      email: 'ahmed@gmail.com',
      roles: [
        {
          name: 'HR',
        },
        {
          name: 'PR',
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 10),
      name: 'Mohamed Mohamed',
      email: 'mohamed@gmail.com',
      roles: [
        {
          name: 'FR',
        },
        {
          name: 'SR',
        },
      ],
    },
  ];

  return (
    <div className={clsx(contentFont.className)}>
      <h2 className="text-[26px] font-medium mb-[24px]">
        {section.name} {t('sections.employees')}
      </h2>

      <div className="w-full rounded-[32px] shadow-tableShadow overflow-y-hidden overflow-x-auto">
        <table
          className={clsx(
            'table-auto w-full min-w-[700px] border-collapse',
            contentFont.className,
            'table',
          )}>
          <thead className="">
            <tr className="font-semibold text-[20px] border-b-solid border-b-tableBorder ">
              <td></td>
              <td>{t('permissions.id')}</td>
              <td>{t('permissions.name')}</td>
              <td>{t('permissions.roles')}</td>
              <td>{t('permissions.email')}</td>
              <td>{t('permissions.permissions')}</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="">
            {employees.map((employee) => {
              return (
                <tr
                  key={employee.id}
                  className="py-[40px] font-medium text-[18px] rounded-[32px]">
                  <td>
                    <div className="w-[100%] h-[100%] flex items-center justify-center">
                      <div className="w-[36px] h-[36px] overflow-hidden rounded-full shrink-0">
                        <img
                          src="/images/defaults/employee.png"
                          className="w-[36px] h-[36px] rounded-full"
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>EYE</td>
                  <td>{employee.email}</td>
                  <td>EYE</td>
                  <td>
                    <DeleteSVG />
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

export default page;

