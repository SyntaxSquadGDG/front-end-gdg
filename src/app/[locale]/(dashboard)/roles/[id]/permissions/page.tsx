import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Permissions from '@app/_components/(dashboard)/roles/permissions';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
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
      text: t('general.permissions'),
      href: `/roles/${id}/permissions`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <Permissions />
    </div>
  );
};

export default page;

