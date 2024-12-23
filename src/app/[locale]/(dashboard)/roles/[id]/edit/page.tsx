import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddRoleButton from '@app/_components/(dashboard)/roles/add-role-button';
import UpdateRole from '@app/_components/(dashboard)/roles/update-role';
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
      text: t('general.edit'),
      href: `/roles/${id}/edit`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <UpdateRole id={id} />
    </div>
  );
};

export default page;

