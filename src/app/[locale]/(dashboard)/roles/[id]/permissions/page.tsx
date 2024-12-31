import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import AddPermissionModal from '@app/_components/(dashboard)/modals/add-permission-modal';
import AddPermissionButton from '@app/_components/(dashboard)/permissions/add-permission-button';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { fetchRole } from '@app/_utils/fetch/queries';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async ({ params }) => {
  const id = (await params).id;

  const t = await getTranslations();

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
          text: t('general.permissions'),
          href: `/roles/${id}/permissions`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG}>
            <AddPermissionButton type={'role'} id={id} />
            <AddPermissionModal type={'role'} id={id} />
          </HeadBar>
        </>
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <TryLater>{t('zero.role')}</TryLater>;
    }
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <RoleDataWrapper />
      </Suspense>
      <Permissions id={id} type="role" full={true} />
    </div>
  );
};

export default page;

