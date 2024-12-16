'use client';

import GuestButton from '@app/_components/(guest)/common/guest-button';
import FormSection from '@app/_components/(guest)/common/form-section';
import TempSection from '@app/_components/(guest)/common/temp-section';
import { headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const Error = () => {
  const t = useTranslations();
  return (
    <FormSection>
      <TempSection
        src={'/images/guest/forms/password-changed.png'}
        head={'Your Password Changed Successfully!'}
        redirect={'/'}
      />
      {/* <TempSection src={'/images/guest/forms/register-sent.png'} head={'Your Request Sent Successfully!'} description={'Your form has been sent successfully. We will contact you soon !'} redirect={'/'} /> */}
    </FormSection>
  );
};

export default Error;

