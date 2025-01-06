'use client';

import { revalidatePathAction } from '@app/actions';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '@app/_contexts/modal-provider';
import clsx from 'clsx';
import DeleteModal from '../modals/delete-modal';
import { useTranslations } from 'next-intl';
import { deleteFile } from './data/deletes';
import toast from 'react-hot-toast';
import Button from '../general/button';
import { getErrorText } from '@app/_utils/translations';

const DeleteFileButton = ({ file }) => {
  const queryClient = useQueryClient();
  const [errorText, setErrorText] = useState(null);
  const { openModal } = useModal();
  const t = useTranslations();

  async function handleDelete() {
    setErrorText(null);
    deleteMutation.mutate();
  }

  const deleteMutation = useMutation({
    mutationFn: () => deleteFile(file.id),
    onSuccess: async () => {
      queryClient.invalidateQueries(['folders', file.parentFolderId]);
      await revalidatePathAction(`/folders/${file.parentFolderId}`);
      redirect(`/folders/${file.parentFolderId}`);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_DELETE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <>
      <Button
        text={t('general.delete')}
        disabled={deleteMutation.isPending}
        onClick={() => openModal(`deleteFileModal${file.id}`)}
        className={clsx(
          'bg-red-400 text-textLight',
          deleteMutation.isPending && 'cursor-not-allowed',
        )}
      />
      <DeleteModal
        error={errorText}
        isDeleting={deleteMutation.isPending}
        modalName={`deleteFileModal${file.id}`}
        head={t('files.deleteDescription')}
        onClick={handleDelete}
      />
    </>
  );
};

export default DeleteFileButton;

