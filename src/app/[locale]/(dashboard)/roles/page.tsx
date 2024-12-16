import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddRoleButton from '@app/_components/(dashboard)/roles/add-role-button';
import RolesTable from '@app/_components/(dashboard)/roles/roles-table';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('roles.roles'), href: '/roles' }];
  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddRoleButton />
      </HeadBar>
      <RolesTable />
    </div>
  );
};

export default page;

