'use client';

import React, { useState } from 'react';
import DeleteModal from '../modals/delete-modal';
import RenameModal from '../modals/rename-modal';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSection } from './data/deletes';
import { getErrorText } from '@app/_utils/translations';
import { renameSection } from './data/updates';
import { usePathname } from 'next/navigation';

const SectionSettingsModals = ({ id }) => {
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
    mutationFn: () => deleteSection(id),
    onSuccess: async () => {
      queryClient.invalidateQueries(['sections']);
      // await revalidatePathAction('/sections');
      toast.success(t('global.deleted'));

      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `folders.errors.${error?.message}`,
        `folders.errors.SECTION_DELETE_ERROR`,
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
    mutationFn: (data) => renameSection(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['sections', id]);
      await queryClient.invalidateQueries(['sections']);
      toast.success(t('folders.renamed'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `sections.errors.${error?.message}`,
        `sections.errors.SECTION_RENAME_ERROR`,
      );
      setErrorTextRenaming(textError);
      toast.error(textError);
    },
  });

  return (
    <>
      <DeleteModal
        head={t('sections.deleteDescription')}
        modalName={`deleteSectionModal${id}`}
        onClick={handleDelete}
        isDeleting={deleteMutation.isPending}
        error={errorTextDeleting}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameSectionModal${id}`}
        isRenaming={renameMutation.isPending}
        onClick={handleRename}
        error={errorTextRenaming}
      />
      <ItemPermissionsEditModal type={'section'} id={id} />
    </>
  );
};

export default SectionSettingsModals;

