import ActivityTable from '@app/_components/(dashboard)/activity-logs/activity-table';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('activity.activity'), href: '/activity' }];
  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <ActivityTable />
    </div>
  );
};

export default page;

