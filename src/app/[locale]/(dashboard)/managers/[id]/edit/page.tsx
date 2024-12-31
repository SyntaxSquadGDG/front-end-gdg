import UpdateManager from '@app/_components/(dashboard)/managers/update-manager';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import { fetchManager } from '@app/_components/(dashboard)/managers/data/queries';

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
          <HeadBar items={items} />
          <UpdateManager manager={manager} />
        </>
      );
    } catch (error) {
      console.error('Error fetching managers:', error);
      return <TryLater>{t('zero.manager')}</TryLater>;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner full={true} />}>
      <ManagerDataWrapper />
    </Suspense>
  );
};

export default page;

