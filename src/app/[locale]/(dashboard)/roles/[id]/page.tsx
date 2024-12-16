import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Employees from '@app/_components/(dashboard)/roles/employees';
import Permissions from '@app/_components/(dashboard)/roles/permissions';
import UpdateRole from '@app/_components/(dashboard)/roles/update-role';
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
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <UpdateRole id={id} />
      <Permissions />
      <Employees />
    </div>
  );
};

export default page;

