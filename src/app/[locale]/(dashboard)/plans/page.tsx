import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Plans from '@app/_components/(dashboard)/plans/plans';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('plans.head'), href: '/plans' }];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <Plans />
    </div>
  );
};

export default page;

