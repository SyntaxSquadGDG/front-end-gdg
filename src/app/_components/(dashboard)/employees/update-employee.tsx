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
import { useRouter } from 'nextjs-toploader/app';
import { revalidatePathAction } from '@app/actions';
import { UpdateEmployeeFetch } from '@app/_utils/fetch/updates';

const UpdateEmployee = ({ employee }) => {
  const t = useTranslations();
  const updateEmployeeSchema = useUpdateEmployeeSchema();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    },
  });

  async function onSuccessHandler() {
    reset();
    await revalidatePathAction('/employees');
    router.push('/employees');
  }

  async function onSuccessUpdate(data) {
    console.log(data);
    const res = await UpdateEmployeeFetch(
      employee.id,
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
              label={t('employees.firstNameLabel')}
              placeHolder={t('employees.firstNamePlaceholder')}
              type={'text'}
              {...register('firstName')}
              isPending={isLoading}
              error={errors.firstName?.message}
            />
            <Input
              label={t('employees.lastNameLabel')}
              placeHolder={t('employees.lastNamePlaceholder')}
              type={'text'}
              {...register('lastName')}
              isPending={isLoading}
              error={errors.lastName?.message}
            />
            <Input
              label={t('employees.emailLabel')}
              placeHolder={t('employees.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              isPending={isLoading}
              error={errors.email?.message}
            />

            <Input
              label={t('employees.idLabel')}
              readOnly={true}
              value={employee.id}
            />
          </div>
          <div className="flex items-center justify-start">
            <Button
              className={'w-[100%] lg:w-[400px] mt-[50px]'}
              text={t('employees.updateEmployeeButton')}
              isPending={isLoading}
              isPendingText={t('employees.updating')}
            />
          </div>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateEmployee;

