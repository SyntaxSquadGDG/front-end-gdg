import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddRoleButton from '@app/_components/(dashboard)/roles/add-role-button';
import RolesTable from '@app/_components/(dashboard)/roles/roles-table';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { decodeJWT } from '@app/_utils/auth';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('roles.roles'), href: '/roles' }];

  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const decodedToken = token ? decodeJWT(token.value) : null;
  const userRole = decodedToken.payload.role;
  const isEmployee = userRole === 'employee';

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddRoleButton />
      </HeadBar>
      <RolesTable my={isEmployee} />
    </div>
  );
};

export default page;

