import UpdateManager from '@app/_components/(dashboard)/managers/update-manager';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import { fetchManager } from '@app/_components/(dashboard)/managers/data/queries';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import RefetchButton from '@app/_components/(dashboard)/general/refetch';
import { refetchManager } from '@app/actions';
import { getErrorText } from '@app/_utils/translations';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';

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
      const textError = getErrorText(
        t,
        `managers.errors.${error?.message}`,
        `managers.errors.MANAGER_LOAD_ERROR`,
      );
      return (
        <LoadErrorDiv>
          <LoadError>{textError}</LoadError>
          <RefetchWrapper tag={`manager${id}`} />
        </LoadErrorDiv>
      );
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner full={true} />}>
      <ManagerDataWrapper />
    </Suspense>
  );
};

export default page;

