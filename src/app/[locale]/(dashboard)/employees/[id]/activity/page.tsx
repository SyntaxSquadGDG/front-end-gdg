import Activity from '@app/_components/(dashboard)/employees/activity';
import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import { fetchEmployee } from '@app/_utils/fetch/queries';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';

const page = async ({ params }) => {
  const id = (await params).id;

  const EmployeeDataWrapper = async () => {
    try {
      const employee = await fetchEmployee(id);

      const items = [
        { text: t('employees.employees'), href: '/employees' },
        {
          text: `${employee.firstName} ${employee.lastName}`,
          href: `/employees/${id}`,
        },
        {
          text: t('activity.activity'),
          href: `/employees/${id}/activity`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG} />
        </>
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <TryLater>{t('zero.employee')}</TryLater>;
    }
  };

  const t = await getTranslations();

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <EmployeeDataWrapper />
      </Suspense>
      <Activity type={'employee'} id={id} full={true} />
    </div>
  );
};

export default page;

