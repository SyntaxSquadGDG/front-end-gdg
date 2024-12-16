import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import NewRole from '@app/_components/(dashboard)/roles/new-role';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [
    { text: t('roles.roles'), href: '/roles' },
    { text: t('roles.add'), href: '/roles/new' },
  ];
  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <NewRole />
    </div>
  );
};

export default page;

