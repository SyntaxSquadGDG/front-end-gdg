import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import AllEmployeesTable from '@app/_components/(dashboard)/employees/all-employees-table';
import EmployeesTable from '@app/_components/(dashboard)/employees/employees-table';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import {
  fetchEmployees,
  fetchEmployeesClient,
} from '@app/_utils/fetch/queries';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('employees.employees'), href: '/employees' }];

  const EmployeesTableWrapper = async () => {
    try {
      const employees = await fetchEmployeesClient(1, 5);
      return <EmployeesTable initialEmployees={employees} />;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <TryLater>{t('zero.employees')}</TryLater>;
    }
  };

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG}>
        <AddEmployeeButton />
      </HeadBar>
      <AllEmployeesTable />
    </div>
  );
};

export default page;

