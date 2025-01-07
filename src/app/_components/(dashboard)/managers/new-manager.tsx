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
import { CreateManager, createManager } from './data/posts';
import ErrorAction from '../general/error-action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorText } from '@app/_utils/translations';

const NewManager = () => {
  const [errorText, setErrorText] = useState(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const t = useTranslations();
  const newManagerSchema = useNewManagerSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newManagerSchema),
  });

  async function onSuccess(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: (data) => createManager(data),
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries(['managers']);
      router.push('/managers');
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `managers.errors.${error?.message}`,
        `managers.errors.MANAGER_CREATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

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
              isPending={mutation.isPending}
              error={errors.firstName?.message}
            />
            <Input
              label={t('managers.lastNameLabel')}
              placeHolder={t('managers.lastNamePlaceholder')}
              type={'text'}
              {...register('lastName')}
              isPending={mutation.isPending}
              error={errors.lastName?.message}
            />
            <Input
              label={t('managers.emailLabel')}
              placeHolder={t('managers.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              isPending={mutation.isPending}
              error={errors.email?.message}
            />

            <Input
              label={t('managers.passwordLabel')}
              placeHolder={t('managers.passwordPlaceholder')}
              type={'password'}
              {...register('password')}
              isPending={mutation.isPending}
              error={errors.password?.message}
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-[16px]">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('managers.addManagerButton')}
              isPending={mutation.isPending}
              isPendingText={t('managers.adding')}
            />
            <ErrorAction>{errorText}</ErrorAction>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewManager;

