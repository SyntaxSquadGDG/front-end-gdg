'use client';

import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import { extendSelect } from '@app/_utils/helper';
import { fetchEmployeesClient } from '@app/_utils/fetch/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import CustomSelect from '../general/select';
import { useTranslations } from 'use-intl';
import SelectedSelect from '../general/selected-select';
import Button from '../general/button';
import { revalidatePathAction } from '@app/actions';
import { useRouter } from 'nextjs-toploader/app';
import { AddTypeToType } from '@app/_utils/fetch/posts';

const AddTypeToTypeModal = ({ fromType, fromId, addingType }) => {
  const { modalStack, closeModal, openModal } = useModal();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const isEmployee = addingType === 'employee';

  const {
    data: dataValues,
    isLoading: isLoadingData,
    isFetching,
    isError: isErrorData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [isEmployee ? 'addEmployeeToRole' : 'addRoleToEmployee'],
    queryFn: ({ pageParam = 1 }) =>
      isEmployee
        ? fetchEmployeesClient(pageParam, 5)
        : fetchEmployeesClient(pageParam, 5), // Adjust the API call to paginate
    getNextPageParam: (lastPage, pages) => {
      const hasData = lastPage.length > 0;
      const isLastPage = lastPage.length < 5; // Assuming you're fetching 5 employees per page
      return hasData && !isLastPage ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const initialData = dataValues?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  const data = extendSelect(
    initialData ? initialData : [],
    isEmployee ? ['firstName', 'lastName'] : ['green'],
    'id',
  );

  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataIds, setSelectedDataIds] = useState([]); // Stores only the data ids

  const handleDataChange = (data) => {
    // First update selectedData and selectedDataIds
    const updatedData = selectedData.includes(data)
      ? selectedData.filter((r) => r.id !== data.id)
      : [...selectedData, data];

    const updatedDataIds = selectedDataIds.includes(data.id)
      ? selectedDataIds.filter((id) => id !== data.id)
      : [...selectedDataIds, data.id];

    // Update the state
    setSelectedData(updatedData);
    setSelectedDataIds(updatedDataIds);
  };
  const availableData = data.filter(
    (data) => !selectedData.some((selected) => selected.id === data.id),
  );

  async function onSuccessHandler() {
    setSelectedData([]);
    setSelectedDataIds([]);
    await revalidatePathAction(isEmployee ? '/roles' : '/employees');
    router.push('/roles');
  }

  async function onClick() {
    const res = await AddTypeToType(
      fromType,
      fromId,
      addingType,
      selectedDataIds,
      setIsLoading,
      setError,
      onSuccessHandler,
    );
  }

  function handleCloseModal() {
    setSelectedData([]);
    setSelectedDataIds([]);
    setError(null);
    closeModal();
  }

  return (
    <Modal
      isOpen={modalStack.includes(`add${addingType}To${fromType}${fromId}`)}
      onClose={handleCloseModal}
      innerClassName="w-[90vw] py-[140px]"
      className={clsx(contentFont.className)}>
      <CustomSelect
        label={isEmployee ? t('roles.employeeLabel') : t('employees.roleLabel')}
        // error={errors.roles?.message}
        options={availableData}
        onChange={handleDataChange}
        // onScroll={handleScroll}
        endPoint={isEmployee ? '/search/employees' : '/search/roles'}
        dataToExtend={isEmployee ? ['firstName', 'lastName'] : ['name']}
        isFetchingData={isFetching}
        isLoadingData={isLoadingData}
        selectedItems={selectedDataIds}
        hasNextData={hasNextPage}
        fetchNextData={fetchNextPage}
        disabled={isLoading}
      />
      <SelectedSelect
        items={selectedData}
        keys={['firstName', 'lastName']}
        handleChange={handleDataChange}
      />

      <Button
        isPendingText={t('general.adding')}
        isPending={isLoading}
        text={t('general.add')}
        disabled={selectedDataIds.length === 0}
        onClick={onClick}
      />
      {error && <p>{error}</p>}
    </Modal>
  );
};

export default AddTypeToTypeModal;

