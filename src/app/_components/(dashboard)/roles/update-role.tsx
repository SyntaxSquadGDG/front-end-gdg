'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import { useUpdateRoleSchema } from '@app/_schemas/update-role';
import { useRouter } from 'nextjs-toploader/app';
import { revalidatePathAction } from '@app/actions';
import { UpdateRoleFetch } from '@app/_utils/fetch/updates';

const UpdateRole = ({ role }) => {
  const t = useTranslations();
  const updateRoleSchema = useUpdateRoleSchema();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const values = {
    name: 'HR',
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: role.name,
    },
  });

  async function onSuccessHandler() {
    reset();
    await revalidatePathAction('/roles');
    router.push('/roles');
  }

  async function onSuccessUpdate(data) {
    console.log(data);
    const res = await UpdateRoleFetch(
      role.id,
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)} className="">
        <div className="w-[100%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[32px]">
            <Input
              label={t('roles.nameLabel')}
              placeHolder={t('roles.namePlaceholder')}
              type={'text'}
              isPending={isLoading}
              {...register('name')}
              error={errors.name?.message}
            />

            <Input label={t('roles.idLabel')} readOnly={true} value={role.id} />
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('roles.updateRoleButton')}
              isPending={isLoading}
              isPendingText={t('roles.updating')}
            />
          </div>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateRole;

