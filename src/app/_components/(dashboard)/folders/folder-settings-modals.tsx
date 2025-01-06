'use client';

import React, { useState } from 'react';
import DeleteModal from '../modals/delete-modal';
import { useTranslations } from 'next-intl';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import FolderMetadataModal from './metadata-modal';
import MoveModal from '../modals/move-modal';
import RenameModal from '../modals/rename-modal';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { usePathname } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFolder } from './data/deletes';
import { getErrorText } from '@app/_utils/translations';
import { renameFolder } from './data/updates';

const FolderSettingsModals = ({ id, name }) => {
  const t = useTranslations();
  const { closeModal } = useModal();
  const [errorTextDeleting, setErrorTextDeleting] = useState(null);
  const [errorTextRenaming, setErrorTextRenaming] = useState(null);
  const queryClient = useQueryClient();
  const pathname = usePathname();

  async function handleDelete() {
    setErrorTextDeleting(null);
    deleteMutation.mutate();
  }

  const deleteMutation = useMutation({
    mutationFn: () => deleteFolder(id),
    onSuccess: async () => {
      await revalidatePathAction(pathname);
      toast.success(t('global.deleted'));

      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        `folders.errors.FOLDER_DELETE_ERROR`,
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
    mutationFn: (data) => renameFolder(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['folders', id]);
      toast.success(t('folders.renamed'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        `folders.errors.FOLDER_RENAME_ERROR`,
      );
      setErrorTextRenaming(textError);
      toast.error(textError);
    },
  });

  return (
    <>
      <DeleteModal
        head={t('folders.deleteDescription')}
        modalName={`deleteFolderModal${id}`}
        isDeleting={deleteMutation.isPending}
        onClick={handleDelete}
        error={errorTextDeleting}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameFolderModal${id}`}
        isRenaming={renameMutation.isPending}
        onClick={(data) => handleRename(data)}
        error={errorTextRenaming}
      />
      <MoveModal move={true} type={'folder'} id={id} itemName={name} />
      <MoveModal move={false} type={'folder'} id={id} itemName={name} />
      <FolderMetadataModal id={id} />

      <ItemPermissionsEditModal type={'folder'} id={id} />
    </>
  );
};

export default FolderSettingsModals;

