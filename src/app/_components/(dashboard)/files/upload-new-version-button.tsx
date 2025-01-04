'use client';

import React, { useState } from 'react';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import Modal from '../modals/modal';
import { useModal } from '@app/_contexts/modal-provider';
import DragAndDropInput from './drag-drop';
import UploadNewVersionModal from './upload-new-version-modal';

const UploadNewVersionButton = ({ id }) => {
  const t = useTranslations();
  const { modalStack, closeModal, openModal } = useModal();
  const [file, setFile] = useState(null);

  function handleClose() {
    setFile(null);
    closeModal();
  }

  return (
    <>
      <Button
        text={t('files.uploadNewVersion')}
        onClick={() => openModal(`uploadNewFile${id}Version`)}
        variant="outline"
      />

      <UploadNewVersionModal
        file={file}
        setFile={setFile}
        id={id}
        handleClose={handleClose}
      />
    </>
  );
};

export default UploadNewVersionButton;

