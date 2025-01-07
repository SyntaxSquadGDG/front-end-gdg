import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import RefetchButton from '@app/_components/(dashboard)/general/refetch';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import { fetchActivePlan } from '@app/_components/(dashboard)/plans/data/queries';
import Plans from '@app/_components/(dashboard)/plans/plans';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
import { getErrorText } from '@app/_utils/translations';
import { refetchPlans, revalidatePathAction } from '@app/actions';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('plans.head'), href: '/plans' }];

  const PlansWrapper = async () => {
    try {
      const activePlan = await fetchActivePlan();
      return <Plans activePlan={activePlan.active} />;
    } catch (error) {
      const errorText = getErrorText(
        t,
        `plans.errors.${error?.message}`,
        `plans.errors.FETCH_PLANS_ERROR`,
      );

      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchButton refetch={refetchPlans} />
        </LoadErrorDiv>
      );
    }
  };

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      {/* <Online>Iam online</Online> */}
      {/* <Offline>I am offline</Offline> */}

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <PlansWrapper />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default page;

