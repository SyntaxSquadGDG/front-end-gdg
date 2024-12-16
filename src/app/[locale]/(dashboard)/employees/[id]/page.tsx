import Activity from '@app/_components/(dashboard)/employees/activity';
import Permissions from '@app/_components/(dashboard)/employees/permissions';
import Roles from '@app/_components/(dashboard)/employees/roles';
import UpdateEmployee from '@app/_components/(dashboard)/employees/update-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const employeeFirstName = 'Amr';
  const t = await getTranslations();
  const items = [
    { text: t('employees.employees'), href: '/employees' },
    {
      text: `${employeeFirstName}${t('employees.profile')}`,
      href: `/employees/${id}`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <UpdateEmployee id={id} />
      <Permissions />
      <Activity />
      <Roles />
    </div>
  );
};

export default page;

