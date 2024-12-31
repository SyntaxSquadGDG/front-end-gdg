'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import { useRouter } from 'nextjs-toploader/app';
import { revalidatePathAction } from '@app/actions';
import { useNewManagerSchema } from './schema/new-manager';
import { CreateManager } from './data/posts';
import ErrorAction from '../general/error-action';

const NewManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const t = useTranslations();
  const newManagerSchema = useNewManagerSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(newManagerSchema),
  });

  async function onCreateSuccess() {
    reset();
    await revalidatePathAction('/managers');
    router.push('/managers');
  }

  async function onSuccess(data) {
    const res = await CreateManager(
      data,
      setIsLoading,
      setError,
      onCreateSuccess,
    );
  }

  function onError() {}

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)} className="">
        <div className="w-[100%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[32px]">
            <Input
              label={t('managers.firstNameLabel')}
              placeHolder={t('managers.firstNamePlaceholder')}
              type={'text'}
              {...register('firstName')}
              isPending={isLoading}
              error={errors.firstName?.message}
            />
            <Input
              label={t('managers.lastNameLabel')}
              placeHolder={t('managers.lastNamePlaceholder')}
              type={'text'}
              {...register('lastName')}
              isPending={isLoading}
              error={errors.lastName?.message}
            />
            <Input
              label={t('managers.emailLabel')}
              placeHolder={t('managers.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              isPending={isLoading}
              error={errors.email?.message}
            />

            <Input
              label={t('managers.passwordLabel')}
              placeHolder={t('managers.passwordPlaceholder')}
              type={'password'}
              {...register('password')}
              isPending={isLoading}
              error={errors.password?.message}
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-[16px]">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('managers.addManagerButton')}
              isPending={isLoading}
              isPendingText={t('managers.adding')}
            />
            <ErrorAction>{error}</ErrorAction>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewManager;

