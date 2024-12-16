'use client';
import { useNewEmployeeSchema } from '@app/_schemas/new-employee';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Input from '../general/input';
import CustomSelect from '../general/select';
import { extendCustomSelect, extendSelect } from '@app/_utils/helper';
import { useNewRoleSchema } from '@app/_schemas/new-role';

const NewRole = () => {
  const t = useTranslations();
  const newRoleSchema = useNewRoleSchema();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(newRoleSchema),
  });

  const initialEmployees = [
    {
      id: 1,
      firstName: 'Amr',
      lastName: 'Shoukry',
      email: 'amr@gmail.com',
    },
    {
      id: 2,
      firstName: 'Ahmed',
      lastName: 'Wael',
      email: 'ahmed@gmail.com',
    },
    {
      id: 3,
      firstName: 'Mohamed',
      lastName: 'Ayman',
      email: 'mo@gmail.com',
    },
  ];

  const employees = extendCustomSelect(
    initialEmployees,
    'firstName',
    'lastName',
    'id',
  );

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]); // Stores only the employee ids

  const handleEmployeeChange = (employee) => {
    // First update selectedEmployees and selectedEmployeeIds
    const updatedEmployees = selectedEmployees.includes(employee)
      ? selectedEmployees.filter((r) => r.id !== employee.id)
      : [...selectedEmployees, employee];

    const updatedEmployeeIds = selectedEmployeeIds.includes(employee.id)
      ? selectedEmployeeIds.filter((id) => id !== employee.id)
      : [...selectedEmployeeIds, employee.id];

    // Update the state
    setSelectedEmployees(updatedEmployees);
    setSelectedEmployeeIds(updatedEmployeeIds);

    // Then, update the form value with the latest selectedEmployeeIds
    setValue('employees', updatedEmployeeIds);
  };
  const availableEmployees = employees.filter(
    (employee) =>
      !selectedEmployees.some((selected) => selected.id === employee.id),
  );

  function onSuccess(data) {
    console.log(data);
    console.log(selectedEmployeeIds);
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

            <div>
              <CustomSelect
                label={t('roles.employeeLabel')}
                error={errors.roles?.message}
                options={availableEmployees}
                onChange={handleEmployeeChange}
              />

              <div className="mt-4">
                {selectedEmployees.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployees.map((employee, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-500 text-white p-2 rounded">
                        {employee.label}
                        <button
                          type="button"
                          onClick={() => handleEmployeeChange(employee)} // Deselect role
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
              text={t('roles.addRoleButton')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRole;

