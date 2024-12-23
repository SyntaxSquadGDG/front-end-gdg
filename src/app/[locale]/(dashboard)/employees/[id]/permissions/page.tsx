import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import Permissions from '@app/_components/(dashboard)/employees/permissions';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddEmployeePermissionModal from '@app/_components/(dashboard)/modals/add-employee-permission-modal';
import AddPermissionButton from '@app/_components/(dashboard)/permissions/add-permission-button';
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
      text: t('general.permissions'),
      href: `/employees/${id}/permissions`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddPermissionButton id={id} />
        <AddEmployeePermissionModal id={id} />
      </HeadBar>
      <Permissions />
    </div>
  );
};

export default page;

