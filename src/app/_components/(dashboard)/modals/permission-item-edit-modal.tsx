import React from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';

const PermissionItemEditModal = ({ children, type, id, itemType, itemId }) => {
  const { modalStack, openModal, closeModal } = useModal();
  return (
    <Modal
      isOpen={modalStack.includes(
        `permission${type}${id}Edit${itemType}${itemId}`,
      )}
      onClose={closeModal}
      innerClassName="w-[800px]"
      className={contentFont.className}>
      {children}
    </Modal>
  );
};

export default PermissionItemEditModal;

