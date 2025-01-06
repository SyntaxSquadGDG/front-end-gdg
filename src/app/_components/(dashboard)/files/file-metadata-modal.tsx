'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import Modal from '../modals/modal';
import toast from 'react-hot-toast';
import MetadataForm from './metadata-form';
import { useQuery } from '@tanstack/react-query';
import { FetchFileMetadata, fetchFileMetadata } from './data/queries';
import DataFetching from '../general/data-fetching';
import FileMetadataForm from './file-metadata-form';
import { fetchFolderMetadata } from '../folders/data/queries';
import { getErrorText } from '@app/_utils/translations';

const FileMetadataModal = ({ fileId, folderId, onClose = () => {} }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [errorTextFolderMetadata, setErrorTextFolderMetadata] = useState(null);
  const [errorTextFileMetadata, setErrorTextFileMetadata] = useState(null);

  const isOpen = modalStack.includes(`FileMetadata${fileId}`);

  function handleClose() {
    onClose();
    closeModal();
  }

  console.log(folderId);

  const {
    data,
    isLoading,
    error: folderError,
  } = useQuery({
    queryKey: ['folderMetadata', folderId], // Unique key for the query
    queryFn: () => fetchFolderMetadata(folderId), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  const {
    data: fileData,
    isLoading: isLoadingFile,
    error: fileError,
  } = useQuery({
    queryKey: ['fileMetadata', fileId], // Unique key for the query
    queryFn: () => fetchFileMetadata(fileId), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  useEffect(() => {
    const textError = getErrorText(
      t,
      `folders.errors.${folderError.message}`,
      `folders.errors.FOLDER_METADATA_FETCH_ERROR`,
    );
    setErrorTextFolderMetadata(textError);
  }, [folderError]);

  useEffect(() => {
    const textError = getErrorText(
      t,
      `files.errors.${fileError.message}`,
      `files.errors.FILE_METADATA_FETCH_ERROR`,
    );
    setErrorTextFileMetadata(textError);
  }, [fileError]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      innerClassName="w-[90vw]"
      className={contentFont.className}>
      <DataFetching
        data={data}
        isLoading={isLoading}
        error={folderError && errorTextFolderMetadata}
        emptyError={t('folders.errors.FOLDER_METADATA_ZERO_ERROR')}>
        <DataFetching
          data={fileData}
          isLoading={isLoadingFile}
          error={fileError && errorTextFileMetadata}>
          <FileMetadataForm
            fileId={fileId}
            folderId={folderId}
            fileMetadata={[]}
            folderMetadata={data}
          />
        </DataFetching>
      </DataFetching>
    </Modal>
  );
};

export default FileMetadataModal;

