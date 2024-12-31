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
import { fetchEmployeesClient } from '@app/_utils/fetch/queries';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { revalidatePathAction } from '@app/actions';
import { useRouter } from 'nextjs-toploader/app';
import { CreateRoleFetch } from '@app/_utils/fetch/posts';
import SelectedSelect from '../general/selected-select';

const NewRole = () => {
  const t = useTranslations();
  const router = useRouter();
  const newRoleSchema = useNewRoleSchema();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(newRoleSchema),
  });

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
    isError: isEmployeesError,
    fetchNextPage: fetchNextEmployees,
    hasNextPage: hasNextEmployees,
  } = useInfiniteQuery({
    queryKey: ['employees'],
    queryFn: ({ pageParam = 1 }) => fetchEmployeesClient(pageParam, 5), // Adjust the API call to paginate
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;
      const isLastPage = lastPage.length < 5; // Assuming you're fetching 5 employees per page
      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const initialEmployees = employeesData?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  console.log(initialEmployees);

  const employees = extendSelect(
    initialEmployees ? initialEmployees : [],
    ['firstName', 'lastName'],
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

  async function onSuccessHandler() {
    reset();
    await revalidatePathAction('/roles');
    router.push('/roles');
  }

  async function onSuccess(data) {
    console.log(data);
    console.log(selectedEmployeeIds);
    const res = await CreateRoleFetch(
      data,
      setIsLoading,
      setError,
      onSuccessHandler,
    );
  }

  function onError() {}

  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight ===
      event.target.scrollTop + event.target.clientHeight;
    if (bottom && !isFetchingEmployees && hasNextEmployees) {
      fetchNextEmployees(); // Fetch the next page of employees
    }
  };

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
                onScroll={handleScroll}
                endPoint={'/search/employees'}
                dataToExtend={['firstName', 'lastName']}
                isFetchingData={isFetchingEmployees}
                isLoadingData={isLoadingEmployees}
                selectedItems={selectedEmployeeIds}
                disabled={isLoading}
                fetchNextData={fetchNextEmployees}
                hasNextData={hasNextEmployees}
                errorData={error}
              />
              <SelectedSelect
                handleChange={handleEmployeeChange}
                items={selectedEmployees}
                keys={['firstName', 'lastName']}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={'w-[100%] lg:w-[50%] mt-[50px]'}
              text={t('roles.addRoleButton')}
              isPending={isLoading}
              isPendingText={t('roles.adding')}
            />
          </div>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default NewRole;

