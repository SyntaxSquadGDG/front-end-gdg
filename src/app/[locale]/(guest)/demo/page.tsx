import Landing from '@app/_components/(guest)/common/landing';
import DemoForm from '@app/_components/(guest)/demo/demo-form';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();

  return (
    <div>
      <Landing
        head={t('demo.landing.head')}
        description={t('demo.landing.description')}
      />
      <DemoForm />
    </div>
  );
};

export default page;

