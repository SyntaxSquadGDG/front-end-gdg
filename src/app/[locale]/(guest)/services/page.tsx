import Landing from '@app/_components/(guest)/common/landing';
import MoreSection from '@app/_components/(guest)/common/more-section';
import Demo from '@app/_components/(guest)/services/demo';
import Features from '@app/_components/(guest)/services/features';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <Landing
        head={t('services.landing.head')}
        description={t('services.landing.description')}
      />
      <Features />
      <MoreSection
        head={t('services.demo.head')}
        description={t('services.demo.description')}
        buttonText={t('services.demo.request')}
        src={'/images/guest/services/demo.png'}
        href="/demo"
      />
    </div>
  );
};

export default page;

