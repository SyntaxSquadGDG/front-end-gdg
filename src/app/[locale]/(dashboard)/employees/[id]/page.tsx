import Activity from '@app/_components/(dashboard)/employees/activity';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import Roles from '@app/_components/(dashboard)/employees/roles';
import UpdateEmployee from '@app/_components/(dashboard)/employees/update-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import RoleHead from '@app/_components/(dashboard)/roles/head';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import ViewSVG from '@app/_components/svgs/employees/view';
import { fetchEmployee } from '@app/_utils/fetch/queries';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import AddPermissionButton from '@app/_components/(dashboard)/permissions/add-permission-button';
import AddPermissionModal from '@app/_components/(dashboard)/modals/add-permission-modal';
import AddTypeButton from '@app/_components/(dashboard)/employees-roles/add-type-button';
import AddTypeToTypeModal from '@app/_components/(dashboard)/modals/add-type-to-type-modal';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import { getErrorText } from '@app/_utils/translations';

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
      const errorText = getErrorText(
        t,
        `employees.errors.${error?.message}`,
        `employees.errors.EMPLOYEE_DATA_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner full={false} />}>
        <EmployeeDataWrapper />
      </Suspense>
      <div className="my-[32px]">
        <RoleHead
          text={t('general.permissions')}
          SVG={ViewSVG}
          href={`/employees/${id}/permissions`}>
          <AddPermissionButton type={'employee'} id={id} full={false} />
          <AddPermissionModal type={'employee'} id={id} />
        </RoleHead>

        <Permissions id={id} type="employee" />
      </div>

      <div className="my-[32px]">
        <RoleHead
          text={t('general.activity')}
          SVG={ViewSVG}
          href={`/employees/${id}/activity`}
        />

        <Activity id={id} type={'employee'} />
      </div>

      <div className="my-[32px]">
        <RoleHead
          text={t('general.roles')}
          SVG={ViewSVG}
          href={`/employees/${id}/roles`}>
          <AddTypeButton
            addingType={'role'}
            fromType={'employee'}
            typeId={id}
            full={false}
          />
          <AddTypeToTypeModal
            addingType={'role'}
            fromType={'employee'}
            fromId={id}
          />
        </RoleHead>

        <Roles id={id} />
      </div>
    </div>
  );
};

export default page;

