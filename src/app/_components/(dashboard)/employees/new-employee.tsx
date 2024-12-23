'use client';
import { useNewEmployeeSchema } from '@app/_schemas/new-employee';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import CustomSelect from '../general/select';
import { extendSelect } from '@app/_utils/helper';

const NewEmployee = () => {
  const t = useTranslations();
  const newEmployeeSchema = useNewEmployeeSchema();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(newEmployeeSchema),
  });

  const initialRoles = [
    {
      id: 1,
      name: 'HR',
    },
    {
      id: 2,
      name: 'PR',
    },
    {
      id: 3,
      name: 'FR',
    },
  ];

  const roles = extendSelect(initialRoles, 'name', 'id');

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]); // Stores only the role ids

  const handleRoleChange = (role) => {
    // First update selectedRoles and selectedRoleIds
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r.id !== role.id)
      : [...selectedRoles, role];

    const updatedRoleIds = selectedRoleIds.includes(role.id)
      ? selectedRoleIds.filter((id) => id !== role.id)
      : [...selectedRoleIds, role.id];

    // Update the state
    setSelectedRoles(updatedRoles);
    setSelectedRoleIds(updatedRoleIds);

    // Then, update the form value with the latest selectedRoleIds
    setValue('roles', updatedRoleIds);
  };
  const availableRoles = roles.filter(
    (role) => !selectedRoles.some((selected) => selected.id === role.id),
  );

  function onSuccess(data) {
    console.log(data);
    console.log(selectedRoleIds);
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

            <Input
              label={t('employees.passwordLabel')}
              placeHolder={t('employees.passwordPlaceholder')}
              type={'password'}
              {...register('password')}
              error={errors.password?.message}
            />

            <div>
              <CustomSelect
                label={t('employees.roleLabel')}
                error={errors.roles?.message}
                options={availableRoles}
                onChange={handleRoleChange}
              />

              <div className="mt-4">
                {selectedRoles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedRoles.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-500 text-white p-2 rounded">
                        {role.name} {role.id}
                        <button
                          type="button"
                          onClick={() => handleRoleChange(role)} // Deselect role
                          className="ml-2 text-white font-bold">
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('employees.addEmployeeButton')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;

