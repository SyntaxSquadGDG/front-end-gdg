'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomSelect from '../common/select';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import { useTranslations } from 'next-intl';
import { useRegisterValues } from '@app/_data/register';
import ErrorAction from '../common/error-action';
import Transition from '@app/_components/transitions/transitions';

const RegisterPage2 = ({
  errors,
  setActivePage,
  control,
  handleSubmit,
  isLoading,
  errorText,
  onSubmit,
}) => {
  const t = useTranslations();
  const {
    typesOptions,
    sizesOptions,
    haveOptions,
    fileOptions,
    whenOptions,
    employeesOptions,
  } = useRegisterValues();

  function onFailure(errors) {
    console.log(errors);
  }

  return (
    <Transition from="right">
      <div className="flex flex-col gap-80px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24px">
          <Controller
            name="type" // The name of the form field
            control={control}
            render={({ field, fieldState }) => (
              <CustomSelect
                {...field} // Spread the `field` props to `CustomSelect`
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
                label={t('forms.register.employeesLabel')}
                error={errors.employees?.message}
                options={employeesOptions}
              />
            )}
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-24px items-start">
          <div className="w-[100%]">
            <GuestButton
              disabled={isLoading}
              className={'w-[100%]'}
              variant="outline"
              onClick={() => setActivePage(1)}>
              {t('general.back')}
            </GuestButton>
          </div>
          <div className="w-[100%] flex flex-col gap-24px">
            <GuestButton
              disabled={isLoading}
              className={'w-[100%]'}
              onClick={handleSubmit(onSubmit, onFailure)}>
              {isLoading ? t('general.submitting') : t('general.submit')}
            </GuestButton>
            <ErrorAction>{errorText}</ErrorAction>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default RegisterPage2;

