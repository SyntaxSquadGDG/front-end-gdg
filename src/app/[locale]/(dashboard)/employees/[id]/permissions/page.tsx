import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddEmployeePermissionModal from '@app/_components/(dashboard)/modals/add-employee-permission-modal';
import AddPermissionButton from '@app/_components/(dashboard)/permissions/add-permission-button';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import { fetchEmployee } from '@app/_utils/fetch/queries';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import AddPermissionModal from '@app/_components/(dashboard)/modals/add-permission-modal';

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
        {
          text: t('general.permissions'),
          href: `/employees/${id}/permissions`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG}>
            <AddPermissionButton type={'employee'} id={id} />
            <AddPermissionModal type={'employee'} id={id} />
          </HeadBar>
        </>
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <TryLater>{t('zero.employee')}</TryLater>;
    }
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <EmployeeDataWrapper />
      </Suspense>
      <Permissions id={id} type="employee" full={true} />
    </div>
  );
};

export default page;

