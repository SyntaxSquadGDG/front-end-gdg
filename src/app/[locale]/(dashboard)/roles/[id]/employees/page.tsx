import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Employees from '@app/_components/(dashboard)/roles/employees';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  const roleName = 'HR';

  const t = await getTranslations();
  const items = [
    { text: t('roles.roles'), href: '/roles' },
    {
      text: roleName,
      href: `/roles/${id}`,
    },
    {
      text: t('general.employees'),
      href: `/roles/${id}/employees`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddEmployeeButton />
      </HeadBar>
      <Employees full={true} />
    </div>
  );
};

export default page;

