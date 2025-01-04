'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '../general/button';
import Modal from '../modals/modal';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@app/actions';
import { RestoreFileVersion } from './data/posts';

const RestoreModal = ({
  fileId,
  versionId,
  onClick,
  isRestoring,
  error,
  onClose = () => {},
}) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();

  function handleClose() {
    onClose();
    closeModal();
  }

  return (
    <Modal
      isOpen={modalStack.includes(`RestoreFile${fileId}Version${versionId}`)}
      onClose={handleClose}
      className={contentFont.className}>
      <div className="flex flex-col gap-[24px] text-center items-center">
        <p className="text-[20px] font-medium">
          {t('files.restoreFileDescription')}
        </p>
        <div className="flex items-center gap-[32px]">
          <Button
            onClick={() => closeModal()}
            text={t('general.cancel')}
            isPending={isRestoring}
            variant="solid"
          />
          <Button
            onClick={onClick}
            text={t('files.restore')}
            isPending={isRestoring}
            isPendingText={t('files.restoring')}
            disabled={isRestoring}
          />
        </div>
        {error && (
          <p className="text-[16px] font-medium text-red-500">* {error}</p>
        )}
      </div>
    </Modal>
  );
};

export default RestoreModal;

