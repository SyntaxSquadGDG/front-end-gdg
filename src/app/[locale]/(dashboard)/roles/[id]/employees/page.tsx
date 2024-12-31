import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import AddTypeToTypeModal from '@app/_components/(dashboard)/modals/add-type-to-type-modal';
import Employees from '@app/_components/(dashboard)/roles/employees';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { fetchRole } from '@app/_utils/fetch/queries';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;

  const RoleDataWrapper = async () => {
    try {
      const role = await fetchRole(id);

      const items = [
        { text: t('roles.roles'), href: '/roles' },
        {
          text: role.name,
          href: `/roles/${id}`,
        },
        {
          text: t('general.employees'),
          href: `/roles/${id}/employees`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG}>
            <AddEmployeeButton toRole={true} roleId={id} />
            <AddTypeToTypeModal
              addingType={'employee'}
              fromType={'role'}
              fromId={id}
            />
          </HeadBar>
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
        <RoleDataWrapper />
      </Suspense>
      <Employees id={id} full={true} />
    </div>
  );
};

export default page;

