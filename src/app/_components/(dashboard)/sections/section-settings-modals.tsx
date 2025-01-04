'use client';

import React, { useState } from 'react';
import DeleteModal from '../modals/delete-modal';
import RenameModal from '../modals/rename-modal';
import ItemPermissionsEditModal from '../modals/item-permissions-edit-modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';

const SectionSettingsModals = ({ id }) => {
  const t = useTranslations();
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Sections/deletesection?id=${section.id}`,
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
      await revalidatePathAction('/sections');
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <DeleteModal
        head={t('sections.deleteDescription')}
        modalName={`deleteSectionModal${id}`}
        onClick={() => {
          handleDelete();
        }}
        isDeleting={isDeleting}
      />
      <RenameModal
        head={t('modals.rename')}
        modalName={`renameSectionModal${id}`}
        isRenaming={isRenaming}
        onClick={(data) => {
          console.log(data);
        }}
      />
      <ItemPermissionsEditModal type={'section'} id={id} />
    </>
  );
};

export default SectionSettingsModals;

