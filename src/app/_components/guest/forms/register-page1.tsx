'use client';

import CompanySVG from '@app/_components/svgs/guest/forms/company';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import Input from '../common/input';
import { useTranslations } from 'next-intl';
import EmailSVG from '@app/_components/svgs/auth/email';
import PhoneSVG from '@app/_components/svgs/guest/forms/phone';
import CountrySVG from '@app/_components/svgs/guest/forms/country';
import GuestButton from '@app/_components/general/guest-button';

const RegisterPage1 = ({
  register,
  errors,
  handleSubmit,
  getValues,
  trigger,
  setActivePage,
}) => {
  const t = useTranslations();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Trigger validation for specific fields: 'company', 'email', 'number', 'country'
    const valid = await trigger(['company', 'email', 'number', 'country']);
    const formData = getValues();

    if (valid) {
      // If validation is successful, you can proceed with the form submission
      onSubmit(formData);
    } else {
      // If validation fails, handle the errors (optional)
      console.log('Validation failed for selected fields');
    }
  };

  function onSubmit(data) {
    console.log(data);
    setActivePage(2);
  }

  function onFailure(errors) {
    console.log(errors);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col lg:flex-row w-[100%] gap-[48px]">
      <div className="flex w-[100%] items-center justify-center">
        <img src="/images/guest/forms/register.png" alt="" />
      </div>
      <div className="w-[100%]">
        <h2
          className={clsx(
            contentFont.className,
            'text-[24px] font-bold linearGuestText2 mb-[32px]',
          )}>
          {t('forms.register.head')}
        </h2>
        <div className="flex flex-col gap-[24px] mb-[40px]">
          <Input
            SVG={CompanySVG}
            label={t('forms.register.companyLabel')}
            placeHolder={t('forms.register.companyPlaceholder')}
            type={'text'}
            {...register('company')}
            error={errors.company?.message}
          />
          <Input
            SVG={EmailSVG}
            label={t('forms.register.emailLabel')}
            placeHolder={t('forms.register.emailPlaceholder')}
            type={'text'}
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            SVG={PhoneSVG}
            label={t('forms.register.numberLabel')}
            placeHolder={t('forms.register.numberPlaceholder')}
            type={'text'}
            {...register('number')}
            error={errors.number?.message}
          />
          <Input
            SVG={CountrySVG}
            label={t('forms.register.countryLabel')}
            placeHolder={t('forms.register.countryPlaceholder')}
            type={'text'}
            {...register('country')}
            error={errors.country?.message}
          />
        </div>
        <GuestButton className={'w-[100%]'}>{t('general.next')}</GuestButton>
      </div>
    </form>
  );
};

export default RegisterPage1;

