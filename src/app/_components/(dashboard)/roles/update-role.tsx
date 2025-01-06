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
import { useMutation } from '@tanstack/react-query';
import { updateRole } from './data/updates';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import ErrorAction from '../general/error-action';

const UpdateRole = ({ role }) => {
  const t = useTranslations();
  const updateRoleSchema = useUpdateRoleSchema();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: role.name,
    },
  });

  async function onSuccess(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => updateRole(role.id, data),
    onSuccess: async () => {
      await revalidatePathAction(`/roles/${role.id}`);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `roles.errors.${error?.message}`,
        `roles.errors.ROLE_UPDATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)} className="">
        <div className="w-[100%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[32px]">
            <Input
              label={t('roles.nameLabel')}
              placeHolder={t('roles.namePlaceholder')}
              type={'text'}
              isPending={mutation.isPending}
              {...register('name')}
              error={errors.name?.message}
            />

            <Input label={t('roles.idLabel')} readOnly={true} value={role.id} />
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('roles.updateRoleButton')}
              isPending={mutation.isPending}
              isPendingText={t('roles.updating')}
            />
          </div>
        </div>
      </form>
      <ErrorAction>{errorText}</ErrorAction>
    </div>
  );
};

export default UpdateRole;

