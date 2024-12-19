'use client';

import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { useTranslations } from 'use-intl';

const DeleteSectionModal = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { modalStack, closeModal, openModal } = useModal();
  const t = useTranslations();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Sections/deletesection?id=${id}`,
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
    <Modal
      isOpen={modalStack.includes(`deleteModal${id}`)}
      onClose={closeModal}
      className={contentFont.className}>
      <h2 className="text-xl font-bold mb-[16px]">{t('sections.delete')}</h2>
      <p className="text-xl font-bold mb-[12px]">
        {t('sections.deleteDescription')}
      </p>
      <input
        type="submit"
        value={isDeleting ? 'Deleting...' : 'Delete'}
        disabled={isDeleting}
        className={clsx(
          'w-[100%] py-[20px] rounded-[8px] px-[16px] bg-red-400 outline-none text-textLight cursor-pointer',
          isDeleting && 'bg-gray-400',
        )}
        onClick={() => handleDelete()}
      />
    </Modal>
  );
};

export default DeleteSectionModal;

