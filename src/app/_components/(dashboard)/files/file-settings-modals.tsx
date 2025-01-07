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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFile } from './data/deletes';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import { renameFile } from './data/updates';
import { usePathname } from 'next/navigation';
import { revalidatePathAction } from '@app/actions';

const FileSettingsModals = ({ id, parentFolderId, name, filePage = false }) => {
  const t = useTranslations();
  const [newFile, setNewFile] = useState(null);
  const [errorTextDeleting, setErrorTextDeleting] = useState(null);
  const [errorTextRenaming, setErrorTextRenaming] = useState(null);
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  function handleClose() {
    setNewFile(null);
    closeModal();
  }

  async function handleDelete() {
    setErrorTextDeleting(null);
    deleteMutation.mutate(id);
  }

  const deleteMutation = useMutation({
    mutationFn: () => deleteFile(id),
    onSuccess: async () => {
      await revalidatePathAction(pathname);
      toast.success(t('global.deleted'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_DELETE_ERROR`,
      );
      setErrorTextDeleting(textError);
      toast.error(textError);
    },
  });

  async function handleRename(data) {
    setErrorTextRenaming(null);
    renameMutation.mutate(data);
  }

  const renameMutation = useMutation({
    mutationFn: (data) => renameFile(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['files', id]);
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_RENAME_ERROR`,
      );
      setErrorTextRenaming(textError);
      toast.error(textError);
    },
  });

  return (
    <>
      {!filePage && (
        <DeleteModal
          head={t('files.deleteDescription')}
          isDeleting={deleteMutation.isPending}
          modalName={`deleteFileModal${id}`}
          onClick={handleDelete}
          error={errorTextDeleting}
        />
      )}
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameFileModal${id}`}
        isRenaming={renameMutation.isPending}
        onClick={(data) => handleRename(data)}
        error={errorTextRenaming}
      />
      <MoveModal move={true} type={'file'} id={id} itemName={name} />
      <MoveModal move={false} type={'file'} id={id} itemName={name} />

      <ItemPermissionsEditModal type={'file'} id={id} />

      <ShowVersionsModal fileId={id} />

      <>
        {!filePage && (
          <UploadNewVersionModal
            file={newFile}
            setFile={setNewFile}
            id={id}
            handleClose={handleClose}
          />
        )}
        <FileMetadataModal fileId={id} />
      </>
    </>
  );
};

export default FileSettingsModals;

