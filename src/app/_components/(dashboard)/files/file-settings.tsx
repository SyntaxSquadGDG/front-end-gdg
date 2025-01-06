'use client';

import React, { useEffect, useState } from 'react';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import MoveModal from '../modals/move-modal';
import RenameModal from '../modals/rename-modal';
import DeleteModal from '../modals/delete-modal';
import ItemModalItem from '../modals/item-modal-item';
import ItemModal from '../modals/item-modal';
import SettingsSVG from '@app/_components/svgs/general/settings';
import EditPermissionsSVG from '@app/_components/svgs/modals/edit-permissions';
import EditSVG from '@app/_components/svgs/modals/edit';
import { useModal } from '@app/_contexts/modal-provider';
import { useTranslations } from 'next-intl';
import ShowVersionSVG from '@app/_components/svgs/modals/show-version';
import UpdateSVG from '@app/_components/svgs/modals/update';
import MetadataSVG from '@app/_components/svgs/modals/metadata';
import MoveSVG from '@app/_components/svgs/modals/move';
import CopySVG from '@app/_components/svgs/modals/copy';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import { fetchFileSettings } from './data/queries';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../general/loader';
import DataFetching from '../general/data-fetching';
import { getErrorText } from '@app/_utils/translations';

const FileSettings = ({ id }) => {
  const { modalStack, openModal } = useModal();
  const t = useTranslations();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [errorText, setErrorText] = useState(null);

  function handleSettingsClick() {
    setIsOpen(true);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['fileSettings', id], // Unique key for the query
    queryFn: () => fetchFileSettings(id), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  useEffect(() => {
    const textError = getErrorText(
      t,
      `files.errors.${error?.message}`,
      `files.errors.FILE_SETTINGS_LOAD_ERROR`,
    );
    setErrorText(textError);
  }, [error]);

  return (
    <div className="relative flex justify-end">
      <button onClick={handleSettingsClick}>
        <SettingsSVG />
      </button>

      <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DataFetching
          data={data}
          error={error && errorText}
          isLoading={isLoading}
          emptyError={t('files.errors.FILE_SETTINGS_LOAD_ERROR')}>
          <React.Fragment>
            <ItemModalItem
              SVG={EditPermissionsSVG}
              text={t('modals.editPermissions')}
              onClick={() => openModal(`ItemPermissionsEdit${'file'}${id}`)}
            />
            <ItemModalItem
              SVG={EditSVG}
              text={t('modals.rename')}
              onClick={() => openModal(`renameFileModal${id}`)}
            />
            <ItemModalItem
              SVG={ShowVersionSVG}
              text={t('modals.showVersions')}
              onClick={() => openModal(`ShowVersionsModal${id}`)}
              // onClick={() => openModal(`renameFileModal${id}`)}
            />
            <ItemModalItem
              SVG={UpdateSVG}
              text={t('modals.update')}
              onClick={() => openModal(`uploadNewFile${id}Version`)}
              // onClick={() => openModal(`renameFileModal${id}`)}
            />
            <ItemModalItem
              SVG={MetadataSVG}
              text={t('modals.viewMetadata')}
              onClick={() => openModal(`FileMetadata${id}`)}
              // onClick={() => openModal(`renameFileModal${id}`)}
            />
            <ItemModalItem
              SVG={MoveSVG}
              text={t('modals.move')}
              onClick={() => openModal(`move${'file'}${id}`)}
            />
            <ItemModalItem
              SVG={CopySVG}
              text={t('modals.copy')}
              onClick={() => openModal(`copy${'file'}${id}`)}
            />
            <ItemModalItem
              SVG={RemoveSVG}
              text={t('modals.delete')}
              onClick={() => openModal(`deleteFileModal${id}`)}
            />
          </React.Fragment>
        </DataFetching>
      </ItemModal>
    </div>
  );
};

export default FileSettings;

