'use client';

import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import { useModal } from '@app/_contexts/modal-provider';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import DeleteModal from '../modals/delete-modal';
import { DeleteFileVersion, deleteFileVersion } from './data/deletes';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import RestoreModal from './restore-file-modal';
import { revalidatePathAction } from '@app/actions';
import { RestoreFileVersion, restoreFileVersion } from './data/posts';
import { fetchFileVersion } from './data/queries';
import LoadingSpinner from '../general/loader';
import { getErrorText } from '@app/_utils/translations';

const FileVersionsTableItem = ({ fileId, version }) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [errorTextDeleting, setErrorTextDeleting] = useState(null);
  const [errorTextRestoring, setErrorTextRestoring] = useState(null);
  const [errorTextVersion, setErrorTextVersion] = useState(null);

  const { openModal, closeModal } = useModal();

  function handleCloseDeleting() {
    setErrorTextDeleting(null);
    // closeModal();
  }

  function handleCloseRestoring() {
    setErrorTextRestoring(null);
    // closeModal();
  }

  async function handleDelete() {
    setErrorTextDeleting(null);
    deleteMutation.mutate();
  }

  const deleteMutation = useMutation({
    mutationFn: () => deleteFileVersion(fileId, version.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['versions', fileId]);
      toast.success(t('global.deleted'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_VERSION_DELETE_ERROR`,
      );
      setErrorTextDeleting(textError);
      toast.error(textError);
    },
  });

  async function handleRestore() {
    setErrorTextRestoring(null);
    restoreMutation.mutate();
  }

  const restoreMutation = useMutation({
    mutationFn: () => restoreFileVersion(fileId, version.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['versions', fileId]);
      await revalidatePathAction(`/files/${fileId}`);
      toast.success(t('files.versionRestored'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_VERSION_RESTORED_ERROR`,
      );
      setErrorTextRestoring(textError);
      toast.error(textError);
    },
  });

  async function handleFetchVersion() {
    setErrorTextVersion(null);
    versionMutation.mutate();
  }

  const versionMutation = useMutation({
    mutationFn: () => fetchFileVersion(fileId, version.id),
    onSuccess: async (data) => {
      const imageUrl = URL.createObjectURL(data);
      window.open(imageUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        `files.errors.FILE_VERSION_FETCH_ERROR`,
      );
      setErrorTextVersion(textError);
      toast.error(textError);
    },
  });

  const pendingCondition =
    versionMutation.isPending ||
    deleteMutation.isPending ||
    restoreMutation.isPending;

  return (
    <>
      <tr>
        <td>{version.uploaded}</td>
        <td>
          <button onClick={handleFetchVersion}>
            {isFetchingVersion ? <LoadingSpinner /> : version.name}
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              openModal(`RestoreFile${fileId}Version${version.id}`);
            }}
            disabled={pendingCondition}>
            <RestoreSVG />
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              openModal(`DeleteFile${fileId}Version${version.id}`);
            }}
            disabled={pendingCondition}
            className="flex items-center justify-center gap-[10px] items-center w-[100%]">
            <RemoveSVG />
            <p className="text-dangerColor text-[16px] font-normal">
              {t('general.remove')}
            </p>
          </button>
        </td>
      </tr>
      <DeleteModal
        isDeleting={deleteMutation.isPending}
        error={errorTextDeleting}
        modalName={`DeleteFile${fileId}Version${version.id}`}
        head={t('files.deleteVersionDescription')}
        onClick={handleDelete}
        onClose={handleCloseDeleting}
      />
      <RestoreModal
        error={errorTextRestoring}
        fileId={fileId}
        isRestoring={restoreMutation.isPending}
        onClose={handleCloseRestoring}
        versionId={version.id}
        onClick={handleRestore}
      />
    </>
  );
};

export default FileVersionsTableItem;

