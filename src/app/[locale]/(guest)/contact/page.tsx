import Landing from '@app/_components/(guest)/common/landing';
import ContactForm from '@app/_components/(guest)/contact/contact-form';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <Landing
        description={t('contact.landing.description')}
        head={t('contact.landing.head')}
      />
      <ContactForm />
    </div>
  );
};

export default page;

