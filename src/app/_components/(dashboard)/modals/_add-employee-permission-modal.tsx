'use client';
import React, { useEffect, useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'use-intl';
import HierarchicalView from '../general/hierarchy';
import SectionFormPermissions from '../permissions/section-form-permissions';
import FolderFormPermissions from '../permissions/folder-form-permissions';
import FileFormPermissions from '../permissions/file-form-permissions';
import { extendSelect } from '@app/_utils/helper';
import CustomSelect from '../general/select';
import NormalSelect from '../general/normal-select';

const data = [
  {
    id: 1,
    name: 'Section 1',
    folders: [
      {
        id: 1,
        name: 'Folder 1',
        files: [
          { id: 1, name: 'File 1' },
          { id: 2, name: 'File 2' },
        ],
        folders: [
          {
            id: 101,
            name: 'Folder 1-1',
            files: [
              { id: 7, name: 'File 7' },
              { id: 8, name: 'File 8' },
            ],
            folders: [
              {
                id: 201,
                name: 'Folder 1-1-1',
                files: [{ id: 9, name: 'File 9' }],
                folders: [], // No further subfolders
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Folder 2',
        files: [
          { id: 3, name: 'File 3' },
          { id: 4, name: 'File 4' },
        ],
        folders: [], // No subfolders
      },
    ],
  },
  {
    id: 2,
    name: 'Section 2',
    folders: [
      {
        id: 3,
        name: 'Folder 3',
        files: [
          { id: 5, name: 'File 5' },
          { id: 6, name: 'File 6' },
        ],
        folders: [
          {
            id: 102,
            name: 'Folder 3-1',
            files: [{ id: 10, name: 'File 10' }],
            folders: [
              {
                id: 401,
                name: 'Folder 3-1-1',
                files: [{ id: 19, name: 'File 19' }],
                folders: [], // No further subfolders
              },
            ], // No further subfolders
          },
        ],
      },
    ],
  },
];

const AddEmployeePermissionModal = ({ id }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [selectedItem, setSelectedItem] = useState({ id: null, type: null });
  const [buttonView, setButtonView] = useState(0);
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

  const [selectedNormal, setSelectedNormal] = useState(1);

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

  useEffect(() => {
    setButtonView(0);
  }, [selectedItem.id, selectedItem.type]);
  return (
    <Modal
      isOpen={modalStack.includes(`addEmployeePermission${id}`)}
      onClose={closeModal}
      className={contentFont.className}>
      <h2 className="text-xl font-bold mb-[16px]">{t('folders.new')}</h2>
      <HierarchicalView
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        data={data}
      />
      <button className="bg-green-400 p-[4px]" onClick={() => setButtonView(1)}>
        ClickMe
      </button>
      {buttonView === 1 && (
        <>
          {selectedItem.type === 'section' && (
            <SectionFormPermissions type="employee" id={id} />
          )}
          {selectedItem.type === 'folder' && (
            <FolderFormPermissions type="employee" id={id} />
          )}
          {selectedItem.type === 'file' && (
            <FileFormPermissions type="employee" id={id} />
          )}
        </>
      )}

      <div>
        <CustomSelect
          label={t('employees.roleLabel')}
          // error={errors.roles?.message}
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
                  {role.name}
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
      <div className="">
        <NormalSelect
          options={roles}
          onChange={setSelectedNormal}
          label={'Select your item'}
          value={selectedNormal}
        />
      </div>
    </Modal>
  );
};

export default AddEmployeePermissionModal;

