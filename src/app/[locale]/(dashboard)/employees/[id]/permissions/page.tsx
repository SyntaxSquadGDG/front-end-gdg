import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import AddEmployeePermissionModal from '@app/_components/(dashboard)/modals/add-employee-permission-modal';
import AddPermissionButton from '@app/_components/(dashboard)/permissions/add-permission-button';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import AddPermissionModal from '@app/_components/(dashboard)/modals/add-permission-modal';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import { getErrorText } from '@app/_utils/translations';
import { fetchEmployee } from '@app/_components/(dashboard)/employees/data/queries';

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
      const errorText = getErrorText(
        t,
        `employees.errors.${error?.message}`,
        `employees.errors.EMPLOYEE_DATA_ERROR`,
      );
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`employee${id}`} />
        </LoadErrorDiv>
      );
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

