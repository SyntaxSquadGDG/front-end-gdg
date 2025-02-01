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
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import LoadingSpinner from '../general/loader';
import { CreateEmployeeFetch } from '@app/_utils/fetch/posts';
import { useRouter } from 'nextjs-toploader/app';
import { revalidatePathAction } from '@app/actions';
import SelectedSelect from '../general/selected-select';
import { fetchEmployees } from './data/queries';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import { CreateEmployee, createEmployee } from './data/posts';
import DataFetching from '../general/data-fetching';
// import { fetchRolesClient } from '@app/_utils/queries';

export const fetchRolesClient = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/roles`);
  console.log('RES is');
  console.log(response);
  if (!response.ok) {
    console.log('?');
    throw new Error('Error fetching roles');
  }
  return response.json();
};

const NewEmployee = () => {
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const queryClient = useQueryClient();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]); // Stores only the role ids

  const [errorCreatingText, setErrorCreatingText] = useState(null);
  const [errorFetchingText, setErrorFetchingText] = useState(null);

  const router = useRouter();

  const t = useTranslations();
  const newEmployeeSchema = useNewEmployeeSchema();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(newEmployeeSchema),
  });

  const {
    data: initialRoles,
    isLoading: isLoadingData,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['roles'],
    queryFn: ({ pageParam = 1 }) => fetchRoles(pageParam, paginationPageLimit),
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  const roles =
    initialRoles && initialRoles.length > 0
      ? extendSelect(initialRoles, ['name'], 'id')
      : [];

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

  async function onSuccess(data) {
    setErrorCreatingText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => createEmployee(data),
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries(['employees']);
      router.push('/employees');
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `employees.errors.${error?.message}`,
        `employees.errors.EMPLOYEE_CREATE_ERROR`,
      );
      setErrorCreatingText(textError);
      toast.error(textError);
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)} className="">
        <div className="w-[100%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32px gap-y-32px">
            <Input
              label={t('employees.firstNameLabel')}
              placeHolder={t('employees.firstNamePlaceholder')}
              type={'text'}
              isPending={mutation.isPending}
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              label={t('employees.lastNameLabel')}
              placeHolder={t('employees.lastNamePlaceholder')}
              type={'text'}
              isPending={mutation.isPending}
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              label={t('employees.emailLabel')}
              placeHolder={t('employees.emailPlaceholder')}
              type={'text'}
              isPending={mutation.isPending}
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label={t('employees.passwordLabel')}
              placeHolder={t('employees.passwordPlaceholder')}
              type={'password'}
              isPending={mutation.isPending}
              {...register('password')}
              error={errors.password?.message}
            />

            <DataFetching
              data={initialRoles}
              isLoading={isLoadingData}
              refetch={refetch}
              error={error && errorFetchingText}>
              <CustomSelect
                label={t('employees.roleLabel')}
                error={errors.roles?.message}
                options={availableRoles}
                onChange={handleRoleChange}
                // onScroll={handleScroll}
                endPoint={'/search/roles'}
                dataToExtend={['name']}
                isFetchingData={isFetching}
                isLoadingData={isLoadingData}
                selectedItems={selectedRoleIds}
                hasNextData={hasNextPage}
                fetchNextData={fetchNextPage}
                disabled={mutation.isPending}
              />
              <SelectedSelect
                handleChange={handleRoleChange}
                items={selectedRoles}
                keys={['name']}
              />
            </DataFetching>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('employees.addEmployeeButton')}
              isPending={mutation.isPending}
              isPendingText={t('employees.adding')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;

