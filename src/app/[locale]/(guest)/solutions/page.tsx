import Landing from '@app/_components/(guest)/common/landing';
import MoreSection from '@app/_components/(guest)/common/more-section';
import Demo from '@app/_components/(guest)/solutions/demo';
import Solutions from '@app/_components/(guest)/solutions/solutions';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <Landing
        head={t('solutions.landing.head')}
        description={t('solutions.landing.description')}
      />
      <Solutions />
      <MoreSection
        head={t('solutions.demo.head')}
        description={t('solutions.demo.description')}
        buttonText={t('solutions.demo.request')}
        src={'/images/guest/solutions/demo.png'}
        href="/demo"
      />
    </div>
  );
};

export default page;

