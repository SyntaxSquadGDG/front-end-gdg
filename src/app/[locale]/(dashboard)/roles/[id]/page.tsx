import AddTypeButton from '@app/_components/(dashboard)/employees-roles/add-type-button';
import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import AddPermissionModal from '@app/_components/(dashboard)/modals/add-permission-modal';
import AddTypeToTypeModal from '@app/_components/(dashboard)/modals/add-type-to-type-modal';
import AddPermissionButton from '@app/_components/(dashboard)/permissions/add-permission-button';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import Employees from '@app/_components/(dashboard)/roles/employees';
import RoleHead from '@app/_components/(dashboard)/roles/head';
import UpdateRole from '@app/_components/(dashboard)/roles/update-role';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import ViewSVG from '@app/_components/svgs/employees/view';
import { fetchRole } from '@app/_utils/fetch/queries';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
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
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG} />
          <UpdateRole role={role} />
        </>
      );
    } catch (error) {
      console.error('Error fetching roles:', error);
      return <TryLater>{t('zero.role')}</TryLater>;
    }
  };

  const t = await getTranslations();

  return (
    <div>
      <Suspense fallback={<LoadingSpinner full={false} />}>
        <RoleDataWrapper />
      </Suspense>
      <div className="my-[32px]">
        <RoleHead
          text={t('permissions.permissions')}
          SVG={ViewSVG}
          href={`/roles/${id}/permissions`}>
          <AddPermissionButton type={'role'} id={id} full={false} />
          <AddPermissionModal type={'role'} id={id} />
        </RoleHead>

        <Permissions id={id} type="role" />
      </div>
      <div className="my-[32px]">
        <RoleHead
          text={t('employees.employees')}
          SVG={ViewSVG}
          href={`/roles/${id}/employees`}>
          <AddTypeButton
            fromType={'role'}
            addingType={'employee'}
            typeId={id}
            full={false}
          />
          <AddTypeToTypeModal
            fromType={'role'}
            fromId={id}
            addingType={'employee'}
          />
        </RoleHead>

        <Employees id={id} />
      </div>
    </div>
  );
};

export default page;

