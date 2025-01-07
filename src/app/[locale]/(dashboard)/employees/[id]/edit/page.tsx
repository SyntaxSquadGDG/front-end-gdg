import { fetchEmployee } from '@app/_components/(dashboard)/employees/data/queries';
import UpdateEmployee from '@app/_components/(dashboard)/employees/update-employee';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getErrorText } from '@app/_utils/translations';
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
    <Suspense fallback={<LoadingSpinner full={true} />}>
      <EmployeeDataWrapper />
    </Suspense>
  );
};

export default page;

