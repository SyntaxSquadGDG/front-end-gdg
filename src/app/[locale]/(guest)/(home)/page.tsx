import MoreSection from '@app/_components/(guest)/common/more-section';
import About from '@app/_components/(guest)/home/about';
import Demo from '@app/_components/(guest)/home/demo';
import Download from '@app/_components/(guest)/home/download';
import Landing from '@app/_components/(guest)/home/landing';
import Services from '@app/_components/(guest)/home/services';
import Services2 from '@app/_components/(guest)/home/services2';
import Solutions from '@app/_components/(guest)/home/solutions';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <Landing />
      <Services />
      <Services2 />
      <About />
      <Solutions />
      <Download />
      <MoreSection
        head={t('home.demo.head')}
        description={t('home.demo.description')}
        buttonText={t('home.demo.request')}
        src={'/images/guest/home/demo.png'}
        href="/demo"
      />
    </div>
  );
};

export default page;

