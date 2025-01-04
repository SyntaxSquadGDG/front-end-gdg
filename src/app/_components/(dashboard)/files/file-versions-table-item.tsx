'use client';

import RemoveSVG from '@app/_components/svgs/files/remove';
import RestoreSVG from '@app/_components/svgs/files/restore';
import { useModal } from '@app/_contexts/modal-provider';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import DeleteModal from '../modals/delete-modal';
import { DeleteFileVersion } from './data/deletes';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import RestoreModal from './restore-file-modal';
import { revalidatePathAction } from '@app/actions';
import { RestoreFileVersion } from './data/posts';
import { fetchFileVersion } from './data/queries';
import LoadingSpinner from '../general/loader';

const FileVersionsTableItem = ({ fileId, version }) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isFetchingVersion, setIsFetchingVersion] = useState(false);
  const [deletingError, setDeletingError] = useState(null);
  const [restoringError, setRestoringError] = useState(null);
  const [fetchingVersionError, setFetchingVersionError] = useState(null);
  const { openModal } = useModal();

  function handleCloseDeleting() {
    setDeletingError(null);
    setIsDeleting(false);
  }

  function handleCloseRestoring() {
    setRestoringError(null);
    setIsRestoring(false);
  }

  async function handleDeleteSuccess() {
    handleCloseDeleting();
    queryClient.invalidateQueries(['fileVersions', fileId]);
    toast.success('general.deleted');
  }

  async function handleDelete() {
    await DeleteFileVersion(
      fileId,
      version.id,
      setIsDeleting,
      setDeletingError,
      handleDeleteSuccess,
      t,
      toast,
    );
  }

  async function handleRestoreSuccess() {
    handleCloseRestoring();
    revalidatePathAction(`/files${fileId}`);
    toast.success('files.restored');
  }

  async function handleRestore() {
    await RestoreFileVersion(
      fileId,
      version.id,
      setIsRestoring,
      setRestoringError,
      handleRestoreSuccess,
      t,
      toast,
    );
  }

  async function handleFetchingVersionSuccess() {
    try {
      // Fetch a random image from the internet
      const response = await fetch('https://picsum.photos/200'); // Random image from Picsum
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      // Get the image as a Blob
      const blob = await response.blob();

      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blob);

      // Open the image in a new tab
      window.open(imageUrl, '_blank');

      // Clean up the created object URL after use (optional but recommended)
      setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
    } catch (error) {
      console.error('Error fetching and displaying image:', error);
    }
  }

  async function handleFetchingVersion() {
    await fetchFileVersion(
      fileId,
      version.id,
      setIsFetchingVersion,
      setFetchingVersionError,
      handleFetchingVersionSuccess,
      toast,
      t,
    );
  }

  return (
    <>
      <tr>
        <td>{version.uploaded}</td>
        <td>
          <button onClick={handleFetchingVersion}>
            {isFetchingVersion ? <LoadingSpinner /> : version.name}
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              openModal(`RestoreFile${fileId}Version${version.id}`);
            }}>
            <RestoreSVG />
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              openModal(`DeleteFile${fileId}Version${version.id}`);
            }}
            className="flex items-center justify-center gap-[10px] items-center w-[100%]">
            <RemoveSVG />
            <p className="text-dangerColor text-[16px] font-normal">
              {t('general.remove')}
            </p>
          </button>
        </td>
      </tr>
      <DeleteModal
        isDeleting={isDeleting}
        error={deletingError}
        modalName={`DeleteFile${fileId}Version${version.id}`}
        head={t('files.deleteVersionDescription')}
        onClick={handleDelete}
        onClose={handleCloseDeleting}
      />
      <RestoreModal
        error={restoringError}
        fileId={fileId}
        isRestoring={isRestoring}
        onClose={handleCloseRestoring}
        versionId={version.id}
        onClick={handleRestore}
      />
    </>
  );
};

export default FileVersionsTableItem;

