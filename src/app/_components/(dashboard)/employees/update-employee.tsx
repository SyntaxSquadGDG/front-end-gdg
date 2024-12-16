'use client';
import { useNewEmployeeSchema } from '@app/_schemas/new-employee';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import CustomSelect from '../general/select';
import { useUpdateEmployeeSchema } from '@app/_schemas/update-employee';

const UpdateEmployee = ({ id }) => {
  const t = useTranslations();
  const updateEmployeeSchema = useUpdateEmployeeSchema();

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
    resolver: zodResolver(updateEmployeeSchema),
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
      <form onSubmit={handleSubmit(onSuccess, onError)} className="">
        <div className="w-[100%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[32px]">
            <Input
              label={t('employees.firstNameLabel')}
              placeHolder={t('employees.firstNamePlaceholder')}
              type={'text'}
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              label={t('employees.lastNameLabel')}
              placeHolder={t('employees.lastNamePlaceholder')}
              type={'text'}
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              label={t('employees.emailLabel')}
              placeHolder={t('employees.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              error={errors.email?.message}
            />

            <Input label={t('employees.idLabel')} readOnly={true} value={id} />
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('employees.updateEmployeeButton')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;

