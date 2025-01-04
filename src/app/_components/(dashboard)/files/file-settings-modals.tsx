'use client';

import React, { useState } from 'react';
import DeleteModal from '../modals/delete-modal';
import RenameModal from '../modals/rename-modal';
import MoveModal from '../modals/move-modal';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import ShowVersionsModal from './show-versions-modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import UploadNewVersionModal from './upload-new-version-modal';
import FileMetadataModal from './file-metadata-modal';

const FileSettingsModals = ({ id, parentFolderId, name, filePage = false }) => {
  const t = useTranslations();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const { closeModal } = useModal();

  function handleDelete() {
    try {
      setIsDeleting(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
  }

  function handleClose() {
    setNewFile(null);
    closeModal();
  }

  return (
    <>
      {!filePage && (
        <DeleteModal
          head={t('files.deleteDescription')}
          isDeleting={isDeleting}
          modalName={`deleteFileModal${id}`}
          onClick={handleDelete}
        />
      )}
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameFileModal${id}`}
        isRenaming={isRenaming}
        onClick={(data) => console.log(data)}
      />
      <MoveModal move={true} type={'file'} id={id} itemName={name} />
      <MoveModal move={false} type={'file'} id={id} itemName={name} />

      <ItemPermissionsEditModal type={'file'} id={id} />

      <ShowVersionsModal fileId={id} />

      {!filePage && (
        <>
          <UploadNewVersionModal
            file={newFile}
            setFile={setNewFile}
            id={id}
            handleClose={handleClose}
          />
          <FileMetadataModal fileId={id} folderId={parentFolderId} />
        </>
      )}
    </>
  );
};

export default FileSettingsModals;

