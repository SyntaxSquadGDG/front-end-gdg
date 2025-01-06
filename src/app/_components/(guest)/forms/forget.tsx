'use client';

import React, { useState } from 'react';
import FormSection from '../common/form-section';
import { useTranslations } from 'next-intl';
import EmailSVG from '@app/_components/svgs/guest/forms/email';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import Input from '../common/input';
import { useForgetSchema } from '@app/_schemas/forget';
import ErrorAction from '../common/error-action';
import { useMutation } from '@tanstack/react-query';
import { forgetPassword } from './data/posts';
import toast from 'react-hot-toast';
import { getErrorText } from '@app/_utils/translations';

const Forget = () => {
  const t = useTranslations();
  const forgetSchema = useForgetSchema();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetSchema),
  });

  async function onSubmit(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => forgetPassword(data),
    onSuccess: async () => {
      reset();
      toast.success(t('forms.forget.success'));
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `forms.errors.${error?.message}`,
        `forms.errors.FORGET_PASSWORD_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <FormSection>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:flex-row flex-col w-[100%] items-center gap-[48px]">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/images/guest/forms/forget.png" alt="" />
        </div>
        <div className="w-[100%]">
          <h2
            className={clsx(
              contentFont.className,
              'text-[30px] font-bold linearGuestText2 mb-[32px]',
            )}>
            {t('forms.forget.head')}
          </h2>
          <div className="flex flex-col gap-[24px]">
            <Input
              SVG={EmailSVG}
              label={t('forms.forget.emailLabel')}
              placeHolder={t('forms.forget.emailPlaceholder')}
              type={'text'}
              disabled={mutation.isPending}
              {...register('email')}
              error={errors.email?.message}
            />
            <p className="text-textLight text-[20px]">
              {t('forms.forget.notifications')}
            </p>
          </div>
          <GuestButton
            className={'w-[100%] mt-[40px] mb-[32px]'}
            disabled={mutation.isPending}>
            {mutation.isPending ? t('general.sending') : t('general.send')}
          </GuestButton>
          <ErrorAction>{errorText}</ErrorAction>
        </div>
      </form>
    </FormSection>
  );
};

export default Forget;

