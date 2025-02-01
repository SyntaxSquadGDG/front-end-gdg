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
import clsx from 'clsx';
import Button from '../general/button';

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

  function onModalClose() {
    closeModal();
    setButtonView(0);
    setSelectedItem({ id: null, type: null });
  }

  useEffect(() => {
    setButtonView(0);
  }, [selectedItem.id, selectedItem.type]);
  return (
    <Modal
      isOpen={modalStack.includes(`addEmployeePermission${id}`)}
      onClose={onModalClose}
      innerClassName="w-[90vw]"
      className={clsx('font-content')}>
      <div>
        <h2 className="font-medium text-20px text-mainColor1">
          {t('permissions.addPermissionHead')}
        </h2>
        <div className="flex items-start justify-between mt-16px flex-col lg:flex-row gap-32px">
          <div className="w-[100%]">
            <HierarchicalView
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              data={data}
            />
            {buttonView === 0 && selectedItem.id && selectedItem.type && (
              <Button
                text={t('permissions.showPermissions')}
                className="mt-16px"
                onClick={() => setButtonView(1)}
              />
            )}
          </div>
          <div
            className={clsx(
              'flex flex-col justify-end w-[100%]',
              buttonView === 0 && 'hidden',
            )}>
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmployeePermissionModal;

