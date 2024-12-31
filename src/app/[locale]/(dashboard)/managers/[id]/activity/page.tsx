import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import { fetchManager } from '@app/_components/(dashboard)/managers/data/queries';
import Activity from '@app/_components/(dashboard)/managers/activity';

const page = async ({ params }) => {
  const id = (await params).id;

  const ManagerDataWrapper = async () => {
    try {
      const manager = await fetchManager(id);

      const items = [
        { text: t('managers.managers'), href: '/managers' },
        {
          text: `${manager.firstName} ${manager.lastName}`,
          href: `/managers/${id}`,
        },
        {
          text: t('activity.activity'),
          href: `/managers/${id}/activity`,
        },
      ];

      return (
        <>
          <HeadBar items={items} SVG={EmployeesSVG} />
        </>
      );
    } catch (error) {
      console.error('Error fetching manager:', error);
      return <TryLater>{t('zero.manager')}</TryLater>;
    }
  };

  const t = await getTranslations();

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ManagerDataWrapper />
      </Suspense>
      <Activity id={id} full={true} />
    </div>
  );
};

export default page;

