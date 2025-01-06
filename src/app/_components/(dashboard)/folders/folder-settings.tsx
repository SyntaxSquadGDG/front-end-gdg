'use client';

import React, { useEffect, useState } from 'react';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import SettingsSVG from '@app/_components/svgs/general/settings';
import ItemModal from '../modals/item-modal';
import ItemModalItem from '../modals/item-modal-item';
import EditPermissionsSVG from '@app/_components/svgs/modals/edit-permissions';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import EditSVG from '@app/_components/svgs/modals/edit';
import MoveSVG from '@app/_components/svgs/modals/move';
import CopySVG from '@app/_components/svgs/modals/copy';
import MetadataSVG from '@app/_components/svgs/modals/metadata';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import DeleteModal from '../modals/delete-modal';
import RenameModal from '../modals/rename-modal';
import MoveModal from '../modals/move-modal';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { usePathname } from 'next/navigation';
import DocumentsSVG from '@app/_components/svgs/guest/documents';
import { fetchFolderSettings } from './data/queries';
import LoadingSpinner from '../general/loader';
import { useQuery } from '@tanstack/react-query';
import DataFetching from '../general/data-fetching';
import { getErrorText } from '@app/_utils/translations';

const FolderSettings = ({ id }) => {
  const t = useTranslations();
  const { openModal, modalStack, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const [errorText, setErrorText] = useState(null);

  function handleSettingsClick() {
    setIsOpen(true);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['folderSettings', id], // Unique key for the query
    queryFn: () => fetchFolderSettings(id), // Function to fetch the data
    enabled: false, // Set to false if you want to fetch on user action (e.g., button click)
  });

  useEffect(() => {
    console.log('AHA');
    const textError = getErrorText(
      t,
      `folders.errors.${error?.message}`,
      `folders.errors.FOLDER_SETTINGS_LOAD_ERROR`,
    );
    setErrorText(textError);
  }, [error]);

  return (
    <div className="relative">
      <button onClick={() => handleSettingsClick()}>
        <SettingsSVG />
      </button>

      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DataFetching
          data={data}
          isLoading={isLoading}
          error={error && errorText}
          emptyError={t('folders.errors.FOLDER_SETTINGS_ZERO_ERROR')}>
          <React.Fragment>
            <ItemModalItem
              SVG={EditPermissionsSVG}
              text={t('modals.editPermissions')}
              onClick={() => openModal(`ItemPermissionsEdit${'folder'}${id}`)}
            />
            <ItemModalItem
              SVG={EditSVG}
              text={t('modals.rename')}
              onClick={() => openModal(`renameFolderModal${id}`)}
            />
            <ItemModalItem
              SVG={MoveSVG}
              text={t('modals.move')}
              onClick={() => openModal(`move${'folder'}${id}`)}
            />
            <ItemModalItem
              SVG={CopySVG}
              text={t('modals.copy')}
              onClick={() => openModal(`copy${'folder'}${id}`)}
            />
            <ItemModalItem
              SVG={MetadataSVG}
              text={t('modals.editMetadata')}
              onClick={() => openModal(`FolderMetadata${id}`)}
              // onClick={() => openModal(`copy${'folder'}${folder.id}`)}
            />
            <ItemModalItem
              SVG={RemoveSVG}
              text={t('modals.delete')}
              onClick={() => openModal(`deleteFolderModal${id}`)}
            />
          </React.Fragment>
        </DataFetching>
      </ItemModal>
    </div>
  );
};

export default FolderSettings;

