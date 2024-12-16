import NewEmployee from '@app/_components/(dashboard)/employees/new-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Input from '@app/_components/(dashboard)/general/input';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [
    { text: t('employees.employees'), href: '/employees' },
    { text: t('employees.add'), href: '/employees/new' },
  ];
  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <NewEmployee />
    </div>
  );
};

export default page;

