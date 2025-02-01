'use client';
import { contentFont } from '@app/_utils/fonts';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../general/input';
import Button from '../general/button';
import ErrorAction from '../general/error-action';
import { revalidatePathAction } from '@app/actions';
import { UpdatePersonalPassword } from './data/updates';
import toast from 'react-hot-toast';
import { useChangePasswordSchema } from './schema/change-password';
import { useMutation } from '@tanstack/react-query';
import { showErrorMessage } from '@app/_utils/fetch';

const ChangePassword = () => {
  const t = useTranslations();
  const changePasswordSchema = useChangePasswordSchema();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSuccess(data) {
    setErrorText(null);
    mutation.mutate(data);
  }
  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => UpdatePersonalPassword(data),
    onSuccess: async () => {
      await revalidatePathAction('/profile');
      toast.success(t('profile.updatedPasswordSuccessfully'));
    },
    onError: (error) => {
      showErrorMessage(
        t,
        `profile.errors.${error?.message}`,
        `profile.errors.UPDATE_PASSWORD_INFO_ERROR`,
        setErrorText,
        toast,
      );
    },
  });

  return (
    <div>
      <h2 className={clsx('font-content', 'text-22px font-medium mb-24px')}>
        {t('profile.changePassword.head')}
      </h2>

      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32px gap-y-32px">
          <Input
            label={t('profile.changePassword.currentLabel')}
            placeHolder={t('profile.changePassword.currentPlaceholder')}
            type={'password'}
            isPending={mutation.isPending}
            {...register('current')}
            error={errors.current?.message}
          />
          <Input
            label={t('profile.changePassword.newLabel')}
            placeHolder={t('profile.changePassword.newPlaceholder')}
            type={'password'}
            isPending={mutation.isPending}
            {...register('new')}
            error={errors.new?.message}
          />
        </div>
        <div className="flex items-start justify-start flex-col gap-16px">
          <Button
            className={'w-[100%] lg:w-fit lg:px-[77px] lg:py-14px mt-32px'}
            text={t('profile.changePassword.updateButton')}
            isPending={mutation.isPending}
            isPendingText={t('general.updating')}
          />
          <ErrorAction>{errorText}</ErrorAction>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

