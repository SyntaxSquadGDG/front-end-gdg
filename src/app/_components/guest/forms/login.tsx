'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import Input from '../common/input';
import CompanySVG from '@app/_components/svgs/guest/forms/company';
import EmailSVG from '@app/_components/svgs/guest/forms/email';
import PasswordSVG from '@app/_components/svgs/guest/forms/password';
import Checkbox from '../common/checkbox';
import Link from 'next/link';
import GuestButton from '@app/_components/general/guest-button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { setCookie } from 'cookies-next/client';
import { revalidatePathAction } from '@app/actions';
import { redirect, useRouter } from 'next/navigation';

const Login = () => {
  const t = useTranslations();
  const router = useRouter();

  const loginSchema = z.object({
    company: z.string().min(1, t('forms.login.companyError')),
    email: z.string().email(t('forms.login.emailError')),
    password: z.string().min(6, t('forms.login.passwordError')),
    remember: z.boolean(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    setCookie(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    );
    await revalidatePathAction('/dashboard');
    router.push('/dashboard');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[100%] flex flex-col lg:flex-row gap-[48px]">
      <div className="w-[100%] flex items-center justify-center">
        <img src="/images/guest/forms/login.png" className="flex" alt="" />
      </div>
      <div className="w-[100%]">
        <h2
          className={clsx(
            contentFont.className,
            'text-[24px] font-bold linearGuestText2 mb-[32px]',
          )}>
          {t('forms.login.head')}
        </h2>
        <div className="flex flex-col gap-[24px]">
          <Input
            SVG={CompanySVG}
            label={t('forms.login.companyLabel')}
            placeHolder={t('forms.login.companyPlaceholder')}
            type={'text'}
            {...register('company')}
            error={errors.company?.message}
          />
          <Input
            SVG={EmailSVG}
            label={t('forms.login.emailLabel')}
            placeHolder={t('forms.login.emailPlaceholder')}
            type={'text'}
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            SVG={PasswordSVG}
            label={t('forms.login.passwordLabel')}
            placeHolder={t('forms.login.passwordPlaceholder')}
            type={'password'}
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row gap-[8px] mt-[16px]">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox label={t('forms.login.remember')} {...field} />
            )}
          />
          <Link
            href={'/forget-password'}
            className="text-[18px] font-semibold text-textLight">
            {t('forms.login.forget')}
          </Link>
        </div>
        <GuestButton className={'w-[100%] mt-[40px] mb-[32px]'}>
          {t('forms.login.login')}
        </GuestButton>
        <p className="text-[20px] text-textLight text-center">
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

