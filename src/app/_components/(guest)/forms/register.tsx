'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import FormSection from '../common/form-section';
import RegisterActive from './register-active';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import RegisterPage1 from './register-page1';
import RegisterPage2 from './register-page2';
import { useRegisterSchema } from '@app/_schemas/register';
import TempSection from '../common/temp-section';

const Register = () => {
  const t = useTranslations();
  const [activePage, setActivePage] = useState(1);
  const registerSchema = useRegisterSchema();
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  if (activePage === -1) {
    return (
      <FormSection>
        <TempSection
          description={t('forms.register.registerSuccessDescription')}
          head={t('forms.register.registerSuccessHead')}
          redirect={'/'}
          src={'/images/guest/forms/register-sent.png'}
        />
      </FormSection>
    );
  }

  return (
    <FormSection>
      <div>
        <RegisterActive activePage={activePage} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
        <div className="mt-[80px] w-[100%]">
          {activePage === 1 && (
            <RegisterPage1
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              clearErrors={clearErrors}
              handleSubmit={handleSubmit}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 2 && (
            <RegisterPage2
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              control={control}
              handleSubmit={handleSubmit}
              setActivePage={setActivePage}
            />
          )}
        </div>
      </form>
    </FormSection>
  );
};

export default Register;

