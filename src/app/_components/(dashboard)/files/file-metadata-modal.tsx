'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Modal from '../modals/modal';
import toast from 'react-hot-toast';
import MetadataForm from './metadata-form';
import { useQuery } from '@tanstack/react-query';
import { FetchFileMetadata, fetchFileMetadata } from './data/queries';
import DataFetching from '../general/data-fetching';
import FileMetadataForm from './file-metadata-form';
import { fetchFolderMetadata } from '../folders/data/queries';

const FileMetadataModal = ({ fileId, folderId, onClose = () => {} }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [error, setError] = useState(null);
  const isOpen = modalStack.includes(`FileMetadata${fileId}`);

  function handleClose() {
    onClose();
    closeModal();
  }

  console.log(folderId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['folderMetadata', folderId], // Unique key for the query
    queryFn: () => fetchFolderMetadata(folderId, setError, t, toast), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  const {
    data: fileData,
    isLoading: isLoadingFile,
    isError: isErrorFile,
  } = useQuery({
    queryKey: ['fileMetadata', fileId], // Unique key for the query
    queryFn: () => fetchFileMetadata(fileId, setError, t, toast), // Function to fetch the data
    enabled: isOpen, // Set to false if you want to fetch on user action (e.g., button click)
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      innerClassName="w-[90vw]"
      className={contentFont.className}>
      <DataFetching
        data={data}
        isLoading={isLoading}
        isError={isError}
        item="Metadata">
        <DataFetching
          data={fileData}
          isLoading={isLoadingFile}
          isError={isErrorFile}
          skipEmpty={true}
          item="File Metadata">
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

