import Landing from '@app/_components/(guest)/common/landing';
import MoreSection from '@app/_components/(guest)/common/more-section';
import TourVideo from '@app/_components/(guest)/tour/video';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();

  return (
    <div>
      <Landing
        head={t('tour.landing.head')}
        description={t('tour.landing.description')}
      />
      <TourVideo />
      <MoreSection
        head={t('tour.demo.head')}
        description={t('tour.demo.description')}
        buttonText={t('tour.demo.request')}
        src={'/images/guest/tour/demo.png'}
        href="/demo"
      />
    </div>
  );
};

export default page;

