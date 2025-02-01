'use client';
import React, { useState } from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'use-intl';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { redirectFromServer, revalidatePathAction } from '@app/actions';
import { useRouter } from 'next/navigation';

const DeleteFileModal = ({ id, parentId, redirect }) => {
  const router = useRouter();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Sfiles/deleteById?fileid=${id}`,
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
      await revalidatePathAction(`/folders/${parentId}`);
      if (redirect) {
        await redirectFromServer(`/folders/${parentId}`);
      }
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  const t = useTranslations();
  const { modalStack, closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <Modal
      isOpen={modalStack.includes(`deleteFileModal${id}`)}
      onClose={closeModal}
      className={'font-content'}>
      <h2 className="text-xl font-bold mb-16px">Delete a file</h2>
      <p className="text-xl font-bold mb-12px">
        Are you sure you want to delete this file?
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

export default DeleteFileModal;

