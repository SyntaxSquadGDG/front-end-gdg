import Accelerated from '@app/_components/(guest)/about/accelerated';
import Different from '@app/_components/(guest)/about/different';
import Statistics from '@app/_components/(guest)/about/statistics';
import Landing from '@app/_components/(guest)/common/landing';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <Landing
        head={t('about.landing.head')}
        description={t('about.landing.description')}
      />
      <Accelerated />
      <Different />
      <Statistics />
    </div>
  );
};

export default page;

