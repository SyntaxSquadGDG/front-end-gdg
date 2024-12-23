'use client';
import { usePersonalInfoSchema } from '@app/_schemas/personal-info';
import { contentFont } from '@app/_utils/fonts';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../general/input';
import Button from '../general/button';
import { useChangePasswordSchema } from '@app/_schemas/change-password';

const ChangePassword = () => {
  const t = useTranslations();
  const changePasswordSchema = useChangePasswordSchema();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  function onSuccess(data) {
    console.log(data);
  }

  function onError() {}

  return (
    <div>
      <h2
        className={clsx(
          contentFont.className,
          'text-[22px] font-medium mb-[24px]',
        )}>
        {t('profile.changePassword.head')}
      </h2>

      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[32px]">
          <Input
            label={t('profile.changePassword.currentLabel')}
            placeHolder={t('profile.changePassword.currentPlaceholder')}
            type={'password'}
            {...register('current')}
            error={errors.current?.message}
          />
          <Input
            label={t('profile.changePassword.newLabel')}
            placeHolder={t('profile.changePassword.newPlaceholder')}
            type={'password'}
            {...register('new')}
            error={errors.new?.message}
          />
        </div>
        <div className="flex items-center justify-start">
          <Button
            className={'w-[100%] lg:w-fit lg:px-[77px] lg:py-[14px] mt-[32px]'}
            text={t('profile.changePassword.updateButton')}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

