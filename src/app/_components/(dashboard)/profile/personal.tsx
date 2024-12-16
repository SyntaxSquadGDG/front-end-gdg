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

const PersonalInfo = () => {
  const t = useTranslations();
  const personalInfoSchema = usePersonalInfoSchema();

  const values = {
    firstName: 'Amr',
    lastName: 'Shoukry',
    email: 'amr@gmail.com',
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    },
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
        {t('profile.personalInfo.head')}
      </h2>

      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[32px] gap-y-[32px]">
          <Input
            label={t('profile.personalInfo.firstNameLabel')}
            placeHolder={t('profile.personalInfo.firstNamePlaceholder')}
            type={'text'}
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label={t('profile.personalInfo.lastNameLabel')}
            placeHolder={t('profile.personalInfo.lastNamePlaceholder')}
            type={'text'}
            {...register('lastName')}
            error={errors.lastName?.message}
          />
          <Input
            label={t('profile.personalInfo.emailLabel')}
            placeHolder={t('profile.personalInfo.emailPlaceholder')}
            type={'text'}
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
        <div className="flex items-center justify-start">
          <Button
            className={'w-[100%] lg:w-fit lg:px-[77px] lg:py-[14px] mt-[32px]'}
            text={t('profile.personalInfo.updateButton')}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

