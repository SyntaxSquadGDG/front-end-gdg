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

const FolderSettingsModals = ({ id, name }) => {
  const t = useTranslations();
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const path = usePathname();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Folders/deletefolderbyid?id=${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) {
        throw new Error('error');
      }
      console.log(res);
      closeModal();
      toast.success('Deleted Successfully');
      await revalidatePathAction(path);
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <DeleteModal
        head={t('folders.deleteDescription')}
        modalName={`deleteFolderModal${id}`}
        isDeleting={isDeleting}
        onClick={handleDelete}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameFolderModal${id}`}
        isRenaming={isRenaming}
        onClick={(data) => console.log(data)}
      />
      <MoveModal move={true} type={'folder'} id={id} itemName={name} />
      <MoveModal move={false} type={'folder'} id={id} itemName={name} />
      <FolderMetadataModal id={id} />

      <ItemPermissionsEditModal type={'folder'} id={id} />
    </>
  );
};

export default FolderSettingsModals;

