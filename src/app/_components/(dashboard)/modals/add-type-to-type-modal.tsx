'use client';

import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import { extendSelect } from '@app/_utils/helper';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import CustomSelect from '../general/select';
import { useTranslations } from 'use-intl';
import SelectedSelect from '../general/selected-select';
import Button from '../general/button';
import { useRouter } from 'nextjs-toploader/app';
import { fetchAvailableEmployeesToRole } from '../employees/data/queries';
import { fetchAvailableRolesToEmployee } from '../roles/data/queries';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { getNextPage } from '@app/_utils/fetch';
import { addEmployeesToRole } from '../roles/data/posts';
import { addRolesToEmployee } from '../employees/data/posts';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';

const AddTypeToTypeModal = ({ fromType, fromId, addingType }) => {
  const { modalStack, closeModal, openModal } = useModal();
  const t = useTranslations();
  const router = useRouter();
  const isAddingEmployees = addingType === 'employee';
  const [errorText, setErrorText] = useState(null);
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const queryClient = useQueryClient();

  const {
    data: dataValues,
    isLoading: isLoadingData,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      isAddingEmployees
        ? `addEmployeeToRole${fromId}`
        : `addRoleToEmployee${fromId}`,
    ],
    queryFn: ({ pageParam = 1 }) =>
      isAddingEmployees
        ? fetchAvailableEmployeesToRole(fromId, pageParam, paginationPageLimit)
        : fetchAvailableRolesToEmployee(fromId, pageParam, paginationPageLimit), // Adjust the API call to paginate
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
  });

  const initialData = dataValues?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  const data = extendSelect(
    initialData ? initialData : [],
    isAddingEmployees ? ['firstName', 'lastName'] : ['name'],
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

  function handleCloseModal() {
    setSelectedData([]);
    setSelectedDataIds([]);
    setErrorText(null);
    closeModal();
  }

  async function onClick() {
    setErrorText(null);
    mutation.mutate();
  }

  const mutation = useMutation({
    mutationFn: () =>
      isAddingEmployees
        ? addEmployeesToRole(fromId, selectedDataIds)
        : addRolesToEmployee(fromId, selectedDataIds),
    onSuccess: async () => {
      setSelectedData([]);
      setSelectedDataIds([]);
      await queryClient.invalidateQueries(
        isAddingEmployees
          ? ['roleEmployees', fromId]
          : ['employeeRoles', fromId],
      );
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        isAddingEmployees
          ? `employees.errors.${error?.message}`
          : `roles.errors.${error?.message}`,
        isAddingEmployees
          ? `employees.errors.EMPLOYEES_TO_ROLE_ERROR`
          : `roles.errors.ROLES_TO_EMPLOYEE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <Modal
      isOpen={modalStack.includes(`add${addingType}To${fromType}${fromId}`)}
      onClose={handleCloseModal}
      innerClassName="w-[90vw] py-[140px]"
      className={clsx('font-content')}>
      <CustomSelect
        label={
          isAddingEmployees
            ? t('roles.employeeLabel')
            : t('employees.roleLabel')
        }
        // error={errors.roles?.message}
        options={availableData}
        onChange={handleDataChange}
        // onScroll={handleScroll}
        endPoint={isAddingEmployees ? '/search/employees' : '/search/roles'}
        dataToExtend={isAddingEmployees ? ['firstName', 'lastName'] : ['name']}
        isFetchingData={isFetching}
        isLoadingData={isLoadingData}
        selectedItems={selectedDataIds}
        hasNextData={hasNextPage}
        fetchNextData={fetchNextPage}
        disabled={mutation.isPending}
      />
      <SelectedSelect
        items={selectedData}
        keys={isAddingEmployees ? ['firstName', 'lastName'] : ['name']}
        handleChange={handleDataChange}
      />

      <Button
        isPendingText={t('general.adding')}
        isPending={mutation.isPending}
        text={t('general.add')}
        disabled={selectedDataIds.length === 0}
        onClick={onClick}
      />
      {error && <p>{errorText}</p>}
    </Modal>
  );
};

export default AddTypeToTypeModal;

