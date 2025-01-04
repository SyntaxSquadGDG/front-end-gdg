'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Button from '../general/button';
import Modal from '../modals/modal';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { RestoreFileVersion } from './data/posts';
import MetadataForm from './metadata-form';
import { useQuery } from '@tanstack/react-query';
import { fetchFolderMetadata } from './data/queries';
import DataFetching from '../general/data-fetching';

const FolderMetadataModal = ({ id, onClose = () => {} }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [error, setError] = useState(false);
  const isOpen = modalStack.includes(`FolderMetadata${id}`);

  function handleClose() {
    onClose();
    closeModal();
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['folderMetadata', id], // Unique key for the query
    queryFn: () => fetchFolderMetadata(id, setError, t, toast), // Function to fetch the data
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
        skipEmpty={true}
        item="Metadata">
        <MetadataForm id={id} initialFields={data} />
      </DataFetching>
    </Modal>
  );
};

export default FolderMetadataModal;

