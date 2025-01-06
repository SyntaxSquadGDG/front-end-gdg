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
import ErrorAction from '../general/error-action';

const LockModal = ({
  fileId,
  type,
  onClick,
  isLocking,
  error,
  onClose = () => {},
}) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const locking = type === 'lock';

  function handleClose() {
    onClose();
    closeModal();
  }

  return (
    <Modal
      isOpen={modalStack.includes(`LockFile${fileId}`)}
      onClose={handleClose}
      className={contentFont.className}>
      <div className="flex flex-col gap-[24px] text-center items-center">
        <p className="text-[20px] font-medium">
          {locking
            ? t('files.lockFileDescription')
            : t('files.unlockFileDescription')}
        </p>
        <div className="flex items-center gap-[32px]">
          <Button
            onClick={() => closeModal()}
            text={t('general.cancel')}
            isPending={isLocking}
            variant="solid"
          />
          <Button
            onClick={onClick}
            text={locking ? t('files.lockButton') : t('files.unlockButton')}
            isPending={isLocking}
            isPendingText={locking ? t('files.locking') : t('files.unlocking')}
            disabled={isLocking}
          />
        </div>
        <ErrorAction>{error}</ErrorAction>
      </div>
    </Modal>
  );
};

export default LockModal;

