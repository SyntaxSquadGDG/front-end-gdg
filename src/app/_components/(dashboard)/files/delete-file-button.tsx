'use client';

import { revalidatePathAction } from '@app/actions';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@app/_contexts/modal-provider';
import clsx from 'clsx';
import DeleteModal from '../modals/delete-modal';
import { useTranslations } from 'next-intl';
import { DeleteFile } from './data/deletes';
import toast from 'react-hot-toast';
import Button from '../general/button';

const DeleteFileButton = ({ file }) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const { openModal } = useModal();
  const t = useTranslations();

  async function handleDelete() {
    await DeleteFile(file.id, setIsDeleting, setError, onSuccess, t, toast);
  }

  async function onSuccess() {
    queryClient.invalidateQueries(['folders', file.parentFolderId]);
    await revalidatePathAction(`/folders/${file.parentFolderId}`);
    redirect(`/folders/${file.parentFolderId}`);
  }

  return (
    <>
      <Button
        text={t('general.delete')}
        disabled={isDeleting}
        onClick={() => openModal(`deleteFileModal${file.id}`)}
        className={clsx(
          'bg-red-400 text-textLight',
          isDeleting && 'cursor-not-allowed',
        )}
      />
      <DeleteModal
        error={error}
        isDeleting={isDeleting}
        modalName={`deleteFileModal${file.id}`}
        head={t('files.deleteDescription')}
        onClick={handleDelete}
      />
    </>
  );
};

export default DeleteFileButton;

