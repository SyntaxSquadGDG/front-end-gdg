import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import EmployeesTable from '@app/_components/(dashboard)/employees/employees-table';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('employees.employees'), href: '/employees' }];
  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddEmployeeButton />
      </HeadBar>
      <EmployeesTable />
    </div>
  );
};

export default page;

