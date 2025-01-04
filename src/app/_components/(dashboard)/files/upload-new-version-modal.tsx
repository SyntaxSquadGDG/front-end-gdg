'use client';

import React from 'react';
import Modal from '../modals/modal';
import { useModal } from '@app/_contexts/modal-provider';
import DragAndDropInput from './drag-drop';

const UploadNewVersionModal = ({ file, setFile, id, handleClose }) => {
  const { modalStack } = useModal();
  return (
    <Modal
      isOpen={modalStack.includes(`uploadNewFile${id}Version`)}
      noOutside={true}
      onClose={handleClose}
      className={''}>
      <DragAndDropInput
        type={'version'}
        parentId={id}
        file={file}
        setFile={setFile}
      />
    </Modal>
  );
};

export default UploadNewVersionModal;

