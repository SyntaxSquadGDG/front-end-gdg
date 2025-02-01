'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React, { useState } from 'react';
import Input from '../common/input';
import CompanySVG from '@app/_components/svgs/guest/forms/company';
import EmailSVG from '@app/_components/svgs/guest/forms/email';
import PasswordSVG from '@app/_components/svgs/guest/forms/password';
import Checkbox from '../common/checkbox';
import Link from 'next/link';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { setCookie } from 'cookies-next/client';
import { revalidatePathAction } from '@app/actions';
import { redirect, useRouter } from 'next/navigation';
import { useLoginSchema } from '@app/_schemas/login';
import { useMutation } from '@tanstack/react-query';
import { login } from './data/posts';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import ErrorAction from '../common/error-action';

const Login = () => {
  const t = useTranslations();
  const router = useRouter();
  const loginSchema = useLoginSchema();
  const [isPending, setIsPending] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  // const onSubmit = async (data) => {
  //   try {
  //     setIsPending(true);
  //     console.log(data);

  //     setCookie(
  //       'token',
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  //     );
  //     await revalidatePathAction('/dashboard');
  //     router.push('/dashboard');
  //   } catch (e) {
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  async function onSubmit(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: async (data) => {
      console.log(data);
      setCookie('token', data.token);
      await revalidatePathAction('/dashboard');
      router.push('/dashboard');
      toast.success(t('forms.login.success'));
      reset();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `forms.errors.${error?.message}`,
        `forms.errors.LOGIN_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[100%] flex flex-col lg:flex-row gap-48px">
      <div className="w-[100%] flex items-center justify-center">
        <img src="/images/guest/forms/login.png" className="flex" alt="" />
      </div>
      <div className="w-[100%]">
        <h2
          className={clsx(
            'font-content',
            'text-24px font-bold linearGuestText2 mb-32px',
          )}>
          {t('forms.login.head')}
        </h2>
        <div className="flex flex-col gap-24px">
          <Input
            SVG={CompanySVG}
            label={t('forms.login.companyLabel')}
            placeHolder={t('forms.login.companyPlaceholder')}
            type={'text'}
            disabled={mutation.isPending}
            {...register('company')}
            error={errors.company?.message}
          />
          <Input
            SVG={EmailSVG}
            label={t('forms.login.emailLabel')}
            placeHolder={t('forms.login.emailPlaceholder')}
            type={'text'}
            disabled={mutation.isPending}
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            SVG={PasswordSVG}
            label={t('forms.login.passwordLabel')}
            placeHolder={t('forms.login.passwordPlaceholder')}
            type={'password'}
            disabled={mutation.isPending}
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row gap-8px mt-16px">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox
                disabled={mutation.isPending}
                label={t('forms.login.remember')}
                {...field}
              />
            )}
          />
          <Link
            href={'/forget-password'}
            className="text-18px font-semibold text-textLight">
            {t('forms.login.forget')}
          </Link>
        </div>
        <GuestButton
          disabled={mutation.isPending}
          className={'w-[100%] mt-40px mb-32px'}>
          {mutation.isPending
            ? t('forms.login.logging')
            : t('forms.login.login')}
        </GuestButton>
        <ErrorAction>{errorText}</ErrorAction>
        <p className="text-20px text-textLight text-center">
          <span>{t('forms.login.not')}</span>
          <span> | </span>
          <Link href={'/register'} className="linearGuestText2">
            {t('forms.login.register')}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;

