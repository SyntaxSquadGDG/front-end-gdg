import UpdateEmployee from '@app/_components/(dashboard)/employees/update-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { fetchEmployee } from '@app/_utils/fetch/queries';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;

  const t = await getTranslations();
  const EmployeeDataWrapper = async () => {
    try {
      const employee = await fetchEmployee(id);

      const items = [
        { text: t('employees.employees'), href: '/employees' },
        {
          text: `${employee.firstName} ${employee.lastName}`,
          href: `/employees/${id}`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG} />
          <UpdateEmployee employee={employee} />
        </>
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <TryLater>{t('zero.employee')}</TryLater>;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner full={true} />}>
      <EmployeeDataWrapper />
    </Suspense>
  );
};

export default page;

