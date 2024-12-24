'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React from 'react';
import Modal from './modal';
import Button from '../general/button';

const DeleteModal = ({ modalName, head, onClick, isDeleting }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  return (
    <Modal
      isOpen={modalStack.includes(modalName)}
      onClose={closeModal}
      className={contentFont.className}>
      <div className="flex flex-col gap-[24px] text-center items-center">
        <p className="text-[20px] font-medium">{head}</p>
        <div className="flex items-center gap-[32px]">
          <Button
            onClick={() => closeModal()}
            text={t('general.cancel')}
            variant="solid"
          />
          <Button
            onClick={onClick}
            text={t('general.delete')}
            disabled={isDeleting}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

