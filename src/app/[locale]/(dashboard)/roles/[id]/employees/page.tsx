import AddEmployeeButton from '@app/_components/(dashboard)/employees/add-employee-button';
import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import AddTypeToTypeModal from '@app/_components/(dashboard)/modals/add-type-to-type-modal';
import { fetchRole } from '@app/_components/(dashboard)/roles/data/queries';
import Employees from '@app/_components/(dashboard)/roles/employees';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getErrorText } from '@app/_utils/translations';
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
      const errorText = getErrorText(
        t,
        `roles.errors.${error?.message}`,
        `roles.errors.ROLE_DATA_ERROR`,
      );
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchWrapper tag={`role${id}`} />
        </LoadErrorDiv>
      );
    }
  };

  const t = await getTranslations();

  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RoleDataWrapper />
        </Suspense>
      </ErrorBoundary>
      <Employees id={id} full={true} />
    </div>
  );
};

export default page;

