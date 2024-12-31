import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import { fetchActivePlan } from '@app/_components/(dashboard)/plans/data/queries';
import Plans from '@app/_components/(dashboard)/plans/plans';
import EmployeesSVG from '@app/_components/svgs/employees/employees';
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
      console.error('Error fetching employees:', error);
      return (
        <LoadError>{t(`responseErrors.plans.${error.message}`)}</LoadError>
      );
    }
  };

  return (
    <div>
      <HeadBar items={items} SVG={EmployeesSVG} />
      <Suspense fallback={<LoadingSpinner />}>
        <PlansWrapper />
      </Suspense>
    </div>
  );
};

export default page;

