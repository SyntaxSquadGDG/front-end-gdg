'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import { useRouter } from 'nextjs-toploader/app';
import { revalidatePathAction } from '@app/actions';
import ErrorAction from '@app/_components/(dashboard)/general/error-action';
import { useUpdateManagerSchema } from './schema/update-manager';
import { UpdateManager, updateManager } from './data/updates';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorText } from '@app/_utils/translations';

const UpdateEmployee = ({ manager }) => {
  const t = useTranslations();
  const updateManagerSchema = useUpdateManagerSchema();
  const [errorText, setErrorText] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateManagerSchema),
    defaultValues: {
      firstName: manager.firstName,
      lastName: manager.lastName,
      email: manager.email,
    },
  });

  async function onSuccessHandler() {
    reset();
    await revalidatePathAction(`/managers/`);
    router.push('/managers');
  }

  async function onSuccessUpdate(data) {
    console.log(data);
    const res = await UpdateManager(
      manager.id,
      data,
      setIsLoading,
      setError,
      onSuccessHandler,
    );
  }

  async function onSuccess(data) {
    console.log(data);
    const res = await onSuccessUpdate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => updateManager(manager.id, data),
    onSuccess: async () => {
      await revalidatePathAction(`/managers/${manager.id}`);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `managers.errors.${error?.message}`,
        `managers.errors.MANAGER_UPDATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)} className="">
        <div className="w-[100%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32px gap-y-32px">
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
              label={t('managers.idLabel')}
              readOnly={true}
              value={manager.id}
            />
          </div>
          <div className="flex items-start justify-start gap-16px flex-col">
            <Button
              className={'w-[100%] lg:w-[400px] mt-[50px]'}
              text={t('managers.updateManagerButton')}
              isPending={mutation.isPending}
              isPendingText={t('managers.updating')}
            />
            <ErrorAction>{errorText}</ErrorAction>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;

