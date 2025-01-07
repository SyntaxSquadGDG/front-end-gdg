import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';
import AddRoleButton from '@app/_components/(dashboard)/roles/add-role-button';
import { fetchRole } from '@app/_components/(dashboard)/roles/data/queries';
import UpdateRole from '@app/_components/(dashboard)/roles/update-role';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
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
          text: t('general.edit'),
          href: `/roles/${id}/edit`,
        },
      ];

      return (
        <div>
          <HeadBar items={items} SVG={EmployeesSVG} />
          <UpdateRole id={id} />
        </div>
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
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RoleDataWrapper />
      </Suspense>
    </ErrorBoundary>
  );
};

export default page;

