'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import Modal from '../modals/modal';
import toast from 'react-hot-toast';
import MetadataForm from './metadata-form';
import { useQuery } from '@tanstack/react-query';
import {
  FetchFileMetadata,
  fetchFileFolderMetadata,
  fetchFileMetadata,
} from './data/queries';
import DataFetching from '../general/data-fetching';
import FileMetadataForm from './file-metadata-form';
import { fetchFolderMetadata } from '../folders/data/queries';
import { getErrorText } from '@app/_utils/translations';

const FileMetadataModal = ({ fileId, onClose = () => {} }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [errorTextFolderMetadata, setErrorTextFolderMetadata] = useState(null);
  const [errorTextFileMetadata, setErrorTextFileMetadata] = useState(null);

  const isOpen = modalStack.includes(`FileMetadata${fileId}`);

  function handleClose() {
    onClose();
    closeModal();
  }

  const {
    data,
    isLoading,
    error: folderError,
    refetch: refetchFolder,
  } = useQuery({
    queryKey: ['folderMetadata'], // Unique key for the query
    queryFn: () => fetchFileFolderMetadata(fileId), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  const {
    data: fileData,
    isLoading: isLoadingFile,
    error: fileError,
    refetch: refetchFile,
  } = useQuery({
    queryKey: ['fileMetadata', fileId], // Unique key for the query
    queryFn: () => fetchFileMetadata(fileId), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  const errorFolder = getErrorText(
    t,
    `folders.errors.${folderError?.message}`,
    `folders.errors.FOLDER_METADATA_FETCH_ERROR`,
  );

  const errorFile = getErrorText(
    t,
    `files.errors.${fileError?.message}`,
    `files.errors.FILE_METADATA_FETCH_ERROR`,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      innerClassName="w-[90vw]"
      className={contentFont.className}>
      <DataFetching
        data={data}
        isLoading={isLoading}
        error={folderError && errorFolder}
        refetch={refetchFolder}
        emptyError={t('folders.errors.FOLDER_METADATA_ZERO_ERROR')}>
        <DataFetching
          data={fileData}
          isLoading={isLoadingFile}
          refetch={refetchFile}
          error={fileError && errorFile}>
          <FileMetadataForm
            fileId={fileId}
            fileMetadata={[]}
            folderMetadata={data}
          />
        </DataFetching>
      </DataFetching>
    </Modal>
  );
};

export default FileMetadataModal;

