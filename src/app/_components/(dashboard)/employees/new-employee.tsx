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
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../general/loader';
import { CreateEmployeeFetch } from '@app/_utils/fetch/posts';
import { useRouter } from 'nextjs-toploader/app';
import { revalidatePathAction } from '@app/actions';
import SelectedSelect from '../general/selected-select';
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
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]); // Stores only the role ids
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(null);
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
    isError: isErrorData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['roles'],
    queryFn: ({ pageParam = 1 }) => fetchEmployeesClient(pageParam, 5),
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;
      const isLastPage = lastPage.length < 5; // Assuming you're fetching 5 employees per page
      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
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

  async function onCreateSuccess() {
    reset();
    await revalidatePathAction('/employees');
    router.push('/employees');
  }

  async function onSuccess(data) {
    console.log(data);
    console.log(selectedRoleIds);
    const res = await CreateEmployeeFetch(
      data,
      setIsLoadingCreate,
      setErrorCreate,
      onCreateSuccess,
    );
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

            {isLoadingData && <LoadingSpinner alignStart={true} />}
            {!isLoadingData && (
              <div>
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
                  disabled={isLoadingCreate}
                />
                <SelectedSelect
                  handleChange={handleRoleChange}
                  items={selectedRoles}
                  keys={['name']}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('employees.addEmployeeButton')}
              isPending={isLoadingCreate}
              isPendingText={t('employees.adding')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;

