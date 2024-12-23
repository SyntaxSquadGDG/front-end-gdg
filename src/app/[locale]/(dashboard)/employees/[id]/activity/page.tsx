import Activity from '@app/_components/(dashboard)/employees/activity';
import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import Permissions from '@app/_components/(dashboard)/employees/permissions';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const employeeName = 'Amr';

  const t = await getTranslations();
  const items = [
    { text: t('employees.employees'), href: '/employees' },
    {
      text: employeeName,
      href: `/employees/${id}`,
    },
    {
      text: t('general.activity'),
      href: `/employees/${id}/activity`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddEmployeeButton />
      </HeadBar>
      <Activity />
    </div>
  );
};

export default page;

