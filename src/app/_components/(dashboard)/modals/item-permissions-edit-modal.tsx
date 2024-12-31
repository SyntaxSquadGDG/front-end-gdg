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

const ItemPermissionsEditModal = ({ id, type }) => {
  const t = useTranslations();
  const { modalStack, closeModal } = useModal();
  const [selectedNormal, setSelectedNormal] = useState(1);

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

  const employees = extendSelect(
    initialEmployees,
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

  return (
    <Modal
      isOpen={modalStack.includes(`ItemPermissionsEdit${type}${id}`)}
      onClose={closeModal}
      innerClassName="w-[800px]"
      className={contentFont.className}>
      <div className="mb-[32px]">
        <NormalSelect
          options={options}
          onChange={setSelectedNormal}
          label={t('permissions.select')}
          value={selectedNormal}
        />
      </div>

      <div>
        <CustomSelect
          label={
            selectedNormal === 1
              ? t('permissions.employees')
              : t('permissions.roles')
          }
          options={selectedNormal === 1 ? availableEmployees : availableRoles}
          onChange={
            selectedNormal === 1 ? handleEmployeeChange : handleRoleChange
          }
        />
        <SelectedSelect
          items={selectedEmployees}
          handleChange={handleEmployeeChange}
          keys={['firstName', 'lastName']}
          condition={selectedNormal === 1}
        />
        <SelectedSelect
          items={selectedRoles}
          handleChange={handleRoleChange}
          keys={['name']}
          condition={selectedNormal === 2}
        />
      </div>
      <div className="mt-[32px]">
        {type === 'section' && <SectionFormPermissions />}
        {type === 'folder' && <FolderFormPermissions />}
        {type === 'file' && <FileFormPermissions />}
      </div>
    </Modal>
  );
};

export default ItemPermissionsEditModal;

