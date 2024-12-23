import UpdateEmployee from '@app/_components/(dashboard)/employees/update-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
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
      text: t('general.edit'),
      href: `/employees/${id}/edit`,
    },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <UpdateEmployee id={id} />
    </div>
  );
};

export default page;

