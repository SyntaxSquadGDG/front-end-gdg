'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import React from 'react';
import Modal from '../modals/modal';
import FileVersions from './file-versions';

const ShowVersionsModal = ({ fileId }) => {
  const { modalStack, closeModal } = useModal();
  const isOpen = modalStack.includes(`ShowVersionsModal${fileId}`);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className={contentFont.className}
      innerClassName="w-[90vw]">
      <FileVersions id={fileId} enabled={isOpen} />
    </Modal>
  );
};

export default ShowVersionsModal;

