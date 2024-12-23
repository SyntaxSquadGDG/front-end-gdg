import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Employees from '@app/_components/(dashboard)/roles/employees';
import RoleHead from '@app/_components/(dashboard)/roles/head';
import Permissions from '@app/_components/(dashboard)/roles/permissions';
import UpdateRole from '@app/_components/(dashboard)/roles/update-role';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import ViewSVG from '@app/_components/svgs/employees/view';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
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
      <div className="my-[32px]">
        <RoleHead
          text={t('permissions.permissions')}
          SVG={ViewSVG}
          href={`/roles/${id}/permissions`}
        />

        <Permissions />
      </div>
      <div className="my-[32px]">
        <RoleHead
          text={t('employees.employees')}
          SVG={ViewSVG}
          href={`/roles/${id}/employees`}
        />

        <Employees full={false} />
      </div>
    </div>
  );
};

export default page;

