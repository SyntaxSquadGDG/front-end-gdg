'use client';
import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';

const DeleteFolderModal = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { modalStack, closeModal, openModal } = useModal();
  const path = usePathname();
  const t = useTranslations();
  const queryClient = useQueryClient();

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
      // await revalidatePathAction(path);
      await queryClient.invalidateQueries(['folderFolders', id]);
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      isOpen={modalStack.includes(`deleteFolderModal${id}`)}
      onClose={closeModal}
      className={'font-content'}>
      <h2 className="text-xl font-bold mb-16px">{t('folders.delete')}</h2>
      <p className="text-xl font-bold mb-12px">
        {t('folders.deleteDescription')}
      </p>
      <input
        type="submit"
        value={isDeleting ? 'Deleting...' : 'Delete'}
        disabled={isDeleting}
        className={clsx(
          'w-[100%] py-20px rounded-[8px] px-16px bg-red-400 outline-none text-textLight cursor-pointer',
          isDeleting && 'bg-gray-400',
        )}
        onClick={() => handleDelete()}
      />
    </Modal>
  );
};

export default DeleteFolderModal;

