import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import NewManager from '@app/_components/(dashboard)/managers/new-manager';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [
    { text: t('managers.managers'), href: '/managers' },
    { text: t('managers.add'), href: '/managers/new' },
  ];

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <NewManager />
    </div>
  );
};

export default page;

