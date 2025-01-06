'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import { useUpdateEmployeeSchema } from '@app/_schemas/update-employee';
import { revalidatePathAction } from '@app/actions';
import { useMutation } from '@tanstack/react-query';
import { updateEmployee } from './data/updates';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import ErrorAction from '../general/error-action';

const UpdateEmployee = ({ employee }) => {
  const t = useTranslations();
  const updateEmployeeSchema = useUpdateEmployeeSchema();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    },
  });

  async function onSuccess(data) {
    console.log(data);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => updateEmployee(employee.id, data),
    onSuccess: async () => {
      await revalidatePathAction(`/employees/${employee.id}`);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `employees.errors.${error?.message}`,
        `employees.errors.EMPLOYEE_UPDATE_ERROR`,
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
              label={t('employees.firstNameLabel')}
              placeHolder={t('employees.firstNamePlaceholder')}
              type={'text'}
              {...register('firstName')}
              isPending={mutation.isPending}
              error={errors.firstName?.message}
            />
            <Input
              label={t('employees.lastNameLabel')}
              placeHolder={t('employees.lastNamePlaceholder')}
              type={'text'}
              {...register('lastName')}
              isPending={mutation.isPending}
              error={errors.lastName?.message}
            />
            <Input
              label={t('employees.emailLabel')}
              placeHolder={t('employees.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              isPending={mutation.isPending}
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
              isPending={mutation.isPending}
              isPendingText={t('employees.updating')}
            />
          </div>
        </div>
      </form>
      <ErrorAction>{errorText}</ErrorAction>
    </div>
  );
};

export default UpdateEmployee;

