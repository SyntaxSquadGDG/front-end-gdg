import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Employees from '@app/_components/(dashboard)/employees/employees';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import Roles from '@app/_components/(dashboard)/employees/roles';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import AddTypeButton from '@app/_components/(dashboard)/employees-roles/add-type-button';
import AddTypeToTypeModal from '@app/_components/(dashboard)/modals/add-type-to-type-modal';
import { fetchEmployee } from '@app/_components/(dashboard)/employees/data/queries';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
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
        {
          text: t('general.roles'),
          href: `/employees/${id}/roles`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG}>
            <AddTypeButton
              fromType={'employee'}
              addingType={'role'}
              typeId={id}
            />
            <AddTypeToTypeModal
              addingType={'role'}
              fromType={'employee'}
              fromId={id}
            />
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
      <Roles id={id} full={true} />
    </div>
  );
};

export default page;

