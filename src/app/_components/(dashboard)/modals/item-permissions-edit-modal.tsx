import React, { useEffect, useState } from 'react';
import Modal from './modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { extendCustomSelect, extendSelect } from '@app/_utils/helper';
import NormalSelect from '../general/normal-select';
import CustomSelect from '../general/select';
import SelectedSelect from '../general/selected-select';
import SectionFormPermissions from '../permissions/section-form-permissions';
import FolderFormPermissions from '../permissions/folder-form-permissions';
import FileFormPermissions from '../permissions/file-form-permissions';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEmployeesClient } from '@app/_utils/fetch/queries';
import { getNextPage } from '@app/_utils/fetch';
import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import {
  fetchAvailableEmployeesToFolder,
  fetchAvailableEmployeesToSection,
} from '../employees/data/queries';
import {
  fetchAvailableRolesToFolder,
  fetchAvailableRolesToSection,
} from '../roles/data/queries';

const ItemPermissionsEditModal = ({ id, type }) => {
  const paginationPageLimit = PAGINATION_PAGE_LIMIT;
  const t = useTranslations();
  const { modalStack, closeModal } = useModal();
  const [selectedNormal, setSelectedNormal] = useState(1);
  const isEmployees = selectedNormal === 1;
  const isOpen = modalStack.includes(`ItemPermissionsEdit${type}${id}`);
  const [errorText, setErrorText] = useState(null);
  let employeesFn;
  let rolesFn;

  switch (type) {
    case 'section':
      employeesFn = fetchAvailableEmployeesToSection;
      rolesFn = fetchAvailableRolesToSection;
      break;
    case 'folder':
      employeesFn = fetchAvailableEmployeesToFolder;
      rolesFn = fetchAvailableRolesToFolder;
      break;
    case 'section':
      employeesFn = fetchAvailableEmployeesToSection;
      rolesFn = fetchAvailableRolesToSection;
      break;
    default:
      employeesFn = fetchAvailableEmployeesToSection;
      rolesFn = fetchAvailableRolesToSection;
      break;
  }

  const options = [
    {
      value: 1,
      label: t('permissions.employees'),
    },
    {
      value: 2,
      label: t('permissions.roles'),
    },
  ];

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    error: rolesError,
    fetchNextPage: fetchNextRoles,
    hasNextPage: hasNextRoles,
  } = useInfiniteQuery({
    queryKey: ['roles'],
    queryFn: ({ pageParam = 1 }) => rolesFn(id, pageParam, paginationPageLimit),
    getNextPageParam: (lastPage, pages) => getNextPage(lastPage, pages),
    enabled: isOpen && !isEmployees,
  });

  const initialRoles = rolesData?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  const roles = extendSelect(initialRoles, ['name'], 'id');

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
    // setValue('roles', updatedRoleIds);
  };
  const availableRoles = roles.filter(
    (role) => !selectedRoles.some((selected) => selected.id === role.id),
  );

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
    error: employeesError,
    fetchNextPage: fetchNextEmployees,
    hasNextPage: hasNextEmployees,
  } = useInfiniteQuery({
    queryKey: ['employees'],
    queryFn: ({ pageParam = 1 }) => employeesFn(pageParam, paginationPageLimit), // Adjust the API call to paginate
    getNextPageParam: (lastPage, pages) =>
      getNextPage(lastPage, pages, paginationPageLimit),
    enabled: isOpen && isEmployees,
  });

  const initialEmployees = employeesData?.pages?.flat() || []; // Flatten the pages to get all employees in one array

  const employees = extendSelect(
    initialEmployees,
    ['firstName', 'lastName'],
    'id',
  );

  console.log(employees);

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
  };
  const availableEmployees = employees.filter(
    (employee) =>
      !selectedEmployees.some((selected) => selected.id === employee.id),
  );

  useEffect(() => {
    setSelectedEmployees([]);
    setSelectedEmployeeIds([]);
    setSelectedRoles([]);
    setSelectedRoleIds([]);
  }, [selectedNormal]);

  function handleClose() {
    setSelectedEmployees([]);
    setSelectedEmployeeIds([]);
    setSelectedRoles([]);
    setSelectedRoleIds([]);
    setSelectedNormal(1);
    closeModal();
  }

  function handleChange(value) {
    setSelectedNormal(value);
    setErrorText(null);
  }

  // useEffect(() => {
  //   setErrorText()
  // }, [employeesError, rolesError])

  return (
    <Modal
      isOpen={modalStack.includes(`ItemPermissionsEdit${type}${id}`)}
      onClose={handleClose}
      innerClassName="w-[800px]"
      className={contentFont.className}>
      <div className="mb-[32px]">
        <NormalSelect
          options={options}
          onChange={handleChange}
          label={t('permissions.select')}
          value={selectedNormal}
        />
      </div>

      <div>
        <CustomSelect
          label={
            isEmployees ? t('permissions.employees') : t('permissions.roles')
          }
          // error={errors.roles?.message}
          options={isEmployees ? availableEmployees : availableRoles}
          onChange={isEmployees ? handleEmployeeChange : handleRoleChange}
          // onScroll={handleScroll}
          endPoint={isEmployees ? '/search/employees' : '/search/roles'}
          dataToExtend={isEmployees ? ['firstName', 'lastName'] : ['name']}
          isFetchingData={isEmployees ? isFetchingEmployees : isFetchingRoles}
          isLoadingData={isEmployees ? isLoadingEmployees : isLoadingRoles}
          selectedItems={isEmployees ? selectedEmployeeIds : selectedRoleIds}
          hasNextData={isEmployees ? hasNextEmployees : hasNextRoles}
          fetchNextData={isEmployees ? fetchNextEmployees : fetchNextRoles}
          // disabled={isLoadingCreate}
        />
        <SelectedSelect
          handleChange={isEmployees ? handleEmployeeChange : handleRoleChange}
          items={isEmployees ? selectedEmployees : selectedRoles}
          keys={isEmployees ? ['firstName', 'lastName'] : ['name']}
        />
      </div>
      <div className="mt-[32px]">
        {type === 'section' && (
          <SectionFormPermissions
            id={isEmployees ? selectedEmployeeIds : selectedRoleIds}
            type={isEmployees ? 'employee' : 'role'}
            sectionId={id}
            mode={'multiple'}
          />
        )}
        {type === 'folder' && (
          <FolderFormPermissions
            id={isEmployees ? selectedEmployeeIds : selectedRoleIds}
            type={isEmployees ? 'employee' : 'role'}
            folderId={id}
            mode={'multiple'}
          />
        )}
        {type === 'file' && (
          <FileFormPermissions
            id={isEmployees ? selectedEmployeeIds : selectedRoleIds}
            type={isEmployees ? 'employee' : 'role'}
            fileId={id}
            mode={'multiple'}
          />
        )}
      </div>
    </Modal>
  );
};

export default ItemPermissionsEditModal;

