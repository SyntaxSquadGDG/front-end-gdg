import Landing from '@app/_components/(guest)/common/landing';
import Plans from '@app/_components/(guest)/pricing/plans';
import PlansInclude from '@app/_components/(guest)/pricing/plans-include';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <Landing
        head={t('pricing.landing.head')}
        description={t('pricing.landing.description')}
      />
      <Plans />
      <PlansInclude />
    </div>
  );
};

export default page;

