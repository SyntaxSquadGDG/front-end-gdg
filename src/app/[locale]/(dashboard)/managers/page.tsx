import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddManagerButton from '@app/_components/(dashboard)/managers/add-manager-button';
import ManagersTable from '@app/_components/(dashboard)/managers/managers-table';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('managers.managers'), href: '/managers' }];
  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddManagerButton />
      </HeadBar>
      <ManagersTable />
    </div>
  );
};

export default page;

