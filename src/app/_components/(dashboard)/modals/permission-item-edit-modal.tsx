import React from 'react';
import Modal from './modal';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';

const PermissionItemEditModal = ({ children, id }) => {
  const { modalStack, openModal, closeModal } = useModal();
  return (
    <Modal
      isOpen={modalStack.includes(`permissionItemEdit${id}`)}
      onClose={closeModal}
      innerClassName="w-[800px]"
      className={contentFont.className}>
      {children}
    </Modal>
  );
};

export default PermissionItemEditModal;

