import Activity from '@app/_components/(dashboard)/managers/activity';
import Permissions from '@app/_components/(dashboard)/permissions/permissions';
import UpdateManager from '@app/_components/(dashboard)/managers/update-manager';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import RoleHead from '@app/_components/(dashboard)/roles/head';
import ManagersSVG from '@app/_components/svgs/managers/managers';
import ViewSVG from '@app/_components/svgs/managers/view';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import { fetchManager } from '@app/_components/(dashboard)/managers/data/queries';
import { getErrorText } from '@app/_utils/translations';
import LoadError from '@app/_components/(dashboard)/general/load-error';

const page = async ({ params }) => {
  const id = (await params).id;
  const t = await getTranslations();

  const ManagerDataWrapper = async () => {
    try {
      const manager = await fetchManager(id);

      const items = [
        { text: t('managers.managers'), href: '/managers' },
        {
          text: `${manager.firstName} ${manager.lastName}`,
          href: `/managers/${id}`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={ManagersSVG} />
          <UpdateManager manager={manager} />
        </>
      );
    } catch (error) {
      const textError = getErrorText(
        t,
        `managers.errors.${error?.message}`,
        `managers.errors.MANAGER_LOAD_ERROR`,
      );
      return <LoadError>{textError}</LoadError>;
    }
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner full={false} />}>
        <ManagerDataWrapper />
      </Suspense>

      <div className="my-[32px]">
        <RoleHead
          text={t('general.activity')}
          SVG={ViewSVG}
          href={`/managers/${id}/activity`}
        />

        <Activity id={id} />
      </div>
    </div>
  );
};

export default page;

