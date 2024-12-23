import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Employees from '@app/_components/(dashboard)/employees/employees';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import Roles from '@app/_components/(dashboard)/employees/roles';

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
      text: t('general.roles'),
      href: `/employees/${id}/roles`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddEmployeeButton />
      </HeadBar>
      <Roles />
    </div>
  );
};

export default page;

