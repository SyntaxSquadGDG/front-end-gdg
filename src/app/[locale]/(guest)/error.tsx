'use client';

import GuestButton from '@app/_components/(guest)/common/guest-button';
import FormSection from '@app/_components/(guest)/common/form-section';
import { headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const Error = () => {
  const t = useTranslations();
  return (
    <FormSection>
      <div className="flex items-center justify-center w-[100%] flex-col">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/images/guest/forms/error.png" alt="" />
        </div>
        <p
          className={clsx(
            'font-head',
            'text-40px font-bold mt-16px mb-40px text-textLight text-center',
          )}>
          {t('general.error')}
        </p>
        <GuestButton link={true} href={'/'} className={'w-[100%] lg:w-fit'}>
          {t('general.home')}
        </GuestButton>
      </div>
    </FormSection>
  );
};

export default Error;

