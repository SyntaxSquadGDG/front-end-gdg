'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomSelect from '../common/select';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import { useTranslations } from 'next-intl';
import { useRegisterValues } from '@app/_data/register';

const RegisterPage2 = ({ errors, setActivePage, control, handleSubmit }) => {
  const t = useTranslations();
  const {
    typesOptions,
    sizesOptions,
    haveOptions,
    fileOptions,
    whenOptions,
    employeesOptions,
  } = useRegisterValues();

  function onSuccess(data) {
    console.log(data);
    setActivePage(-1);
  }

  function onFailure(errors) {
    console.log(errors);
  }

  return (
    <div className="flex flex-col gap-[80px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        <Controller
          name="type" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label={t('forms.register.typeLabel')}
              error={errors.type?.message}
              options={typesOptions}
            />
          )}
        />
        <Controller
          name="files" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label={t('forms.register.filesLabel')}
              error={errors.files?.message}
              options={fileOptions}
            />
          )}
        />
        <Controller
          name="size" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label={t('forms.register.sizeLabel')}
              error={errors.size?.message}
              options={sizesOptions}
            />
          )}
        />
        <Controller
          name="when" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label={t('forms.register.whenLabel')}
              error={errors.when?.message}
              options={whenOptions}
            />
          )}
        />
        <Controller
          name="have" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label={t('forms.register.haveLabel')}
              error={errors.have?.message}
              options={haveOptions}
            />
          )}
        />
        <Controller
          name="employees" // The name of the form field
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field} // Spread the `field` props to `CustomSelect`
              label={t('forms.register.employeesLabel')}
              error={errors.employees?.message}
              options={employeesOptions}
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
        <GuestButton
          className={'w-[100%]'}
          onClick={handleSubmit(onSuccess, onFailure)}>
          {t('general.submit')}
        </GuestButton>
      </div>
    </div>
  );
};

export default RegisterPage2;

