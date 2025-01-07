'use client';
import { contentFont } from '@app/_utils/fonts';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../general/input';
import Button from '../general/button';
import { usePersonalInfoSchema } from './schema/personal-info';
import { UpdatePersonalInfo } from './data/updates';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import ErrorAction from '../general/error-action';
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';
import { showErrorMessage } from '@app/_utils/fetch';

const PersonalInfo = ({ data }) => {
  const t = useTranslations();
  const personalInfoSchema = usePersonalInfoSchema();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  });

  async function onSuccess(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: (data) => UpdatePersonalInfo(data),
    onSuccess: async () => {
      await revalidatePathAction('/profile');
      toast.success(t('profile.updatedDataSuccessfully'));
    },
    onError: (error) => {
      showErrorMessage(
        t,
        `profile.errors.${error?.message}`,
        `profile.errors.UPDATE_PERSONAL_INFO_ERROR`,
        setErrorText,
        toast,
      );
    },
  });

  return (
    <div>
      <h2
        className={clsx(
          contentFont.className,
          'text-[22px] font-medium mb-[24px]',
        )}>
        {t('profile.personalInfo.head')}
      </h2>

      <form onSubmit={handleSubmit(onSuccess)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[32px] gap-y-[32px]">
          <Input
            label={t('profile.personalInfo.firstNameLabel')}
            placeHolder={t('profile.personalInfo.firstNamePlaceholder')}
            type={'text'}
            isPending={mutation.isPending}
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label={t('profile.personalInfo.lastNameLabel')}
            placeHolder={t('profile.personalInfo.lastNamePlaceholder')}
            type={'text'}
            isPending={mutation.isPending}
            {...register('lastName')}
            error={errors.lastName?.message}
          />
          <Input
            label={t('profile.personalInfo.emailLabel')}
            placeHolder={t('profile.personalInfo.emailPlaceholder')}
            type={'text'}
            isPending={mutation.isPending}
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
        <div className="flex items-start justify-start flex-col gap-[16px]">
          <Button
            className={'w-[100%] lg:w-fit lg:px-[77px] lg:py-[14px] mt-[32px]'}
            text={t('profile.personalInfo.updateButton')}
            isPending={mutation.isPending}
            isPendingText={t('general.updating')}
          />
          <ErrorAction>{errorText}</ErrorAction>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

