'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import { useUpdateRoleSchema } from '@app/_schemas/update-role';

const UpdateRole = ({ id }) => {
  const t = useTranslations();
  const updateRoleSchema = useUpdateRoleSchema();

  const values = {
    name: 'HR',
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: values.name,
    },
  });

  function onSuccess(data) {
    console.log(data);
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
              {...register('name')}
              error={errors.name?.message}
            />

            <Input label={t('roles.idLabel')} readOnly={true} value={id} />
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('roles.updateRoleButton')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateRole;

