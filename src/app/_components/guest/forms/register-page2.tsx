'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomSelect from '../common/select';
import GuestButton from '@app/_components/general/guest-button';
import { useTranslations } from 'next-intl';

const RegisterPage2 = ({ errors, setActivePage }) => {
  const { control, handleSubmit } = useForm();
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[80px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        <Controller
          name="country" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label="Select Country"
              error={errors.type?.message}
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'Canada', value: 'canada' },
                { label: 'UK', value: 'uk' },
              ]}
            />
          )}
        />
        <Controller
          name="country" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label="Select Country"
              error={errors.type?.message}
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'Canada', value: 'canada' },
                { label: 'UK', value: 'uk' },
              ]}
            />
          )}
        />
        <Controller
          name="country" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label="Select Country"
              error={errors.type?.message}
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'Canada', value: 'canada' },
                { label: 'UK', value: 'uk' },
              ]}
            />
          )}
        />
        <Controller
          name="country" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label="Select Country"
              error={errors.type?.message}
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'Canada', value: 'canada' },
                { label: 'UK', value: 'uk' },
              ]}
            />
          )}
        />
        <Controller
          name="country" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label="Select Country"
              error={errors.type?.message}
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'Canada', value: 'canada' },
                { label: 'UK', value: 'uk' },
              ]}
            />
          )}
        />
        <Controller
          name="country" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label="Select Country"
              error={errors.type?.message}
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'Canada', value: 'canada' },
                { label: 'UK', value: 'uk' },
              ]}
            />
          )}
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-[24px]">
        <GuestButton
          className={'w-[100%]'}
          variant="outline"
          onClick={() => setActivePage(1)}>
          {t('general.back')}
        </GuestButton>
        <GuestButton className={'w-[100%]'}>{t('general.submit')}</GuestButton>
      </div>
    </div>
  );
};

export default RegisterPage2;

