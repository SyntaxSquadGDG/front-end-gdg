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
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';
import { registerUser } from './data/posts';
import toast from 'react-hot-toast';

const Register = () => {
  const t = useTranslations();
  const [activePage, setActivePage] = useState(1);
  const registerSchema = useRegisterSchema();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    clearErrors,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: async () => {
      reset();
      setActivePage(-1);
      toast.success(t('forms.register.success'));
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `forms.errors.${error?.message}`,
        `forms.errors.REGISTER_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  const isLoading = mutation.isPending;

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
              isLoading={isLoading}
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
              onSubmit={onSubmit}
              setActivePage={setActivePage}
              isLoading={isLoading}
              errorText={errorText}
            />
          )}
        </div>
      </form>
    </FormSection>
  );
};

export default Register;

