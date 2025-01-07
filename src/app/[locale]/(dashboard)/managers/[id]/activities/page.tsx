import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import EmployeesSVG from '@app/_components/svgs/navbars/employees';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import { fetchManager } from '@app/_components/(dashboard)/managers/data/queries';
import Activity from '@app/_components/(dashboard)/managers/activity';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import RefetchButton from '@app/_components/(dashboard)/general/refetch';
import { getErrorText } from '@app/_utils/translations';
import { refetchManager } from '@app/actions';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import RefetchWrapper from '@app/_components/(dashboard)/general/refetch-wrapper';

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

  const t = await getTranslations();

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ManagerDataWrapper />
      </Suspense>
      <Activity type="manager" id={id} full={true} />
    </div>
  );
};

export default page;

