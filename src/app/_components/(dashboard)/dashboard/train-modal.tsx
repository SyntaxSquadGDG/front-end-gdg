'use client';

import React, { useState } from 'react';
import Modal from '../modals/modal';
import { useTranslations } from 'next-intl';
import { contentFont } from '@app/_utils/fonts';
import { useModal } from '@app/_contexts/modal-provider';
import Button from '../general/button';
import toast from 'react-hot-toast';
import { trainModel } from './data/posts';

const TrainModal = () => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function onSuccess() {
    toast.success(t('dashboard.trainSuccess'));
    closeModal();
  }

  async function train() {
    const res = await trainModel(toast, t, setIsLoading, setError, onSuccess);
  }

  return (
    <Modal
      isOpen={modalStack.includes('trainModal')}
      onClose={closeModal}
      className={contentFont.className}>
      <div className="flex flex-col gap-[24px] text-center items-center">
        <p className="text-[20px] font-medium">
          {t('dashboard.trainModalHead')}
        </p>
        <div className="flex items-center gap-[32px]">
          <Button
            onClick={() => closeModal()}
            text={t('general.cancel')}
            variant="solid"
          />
          <Button
            onClick={train}
            text={t('general.yes')}
            isPending={isLoading}
            isPendingText={t('dashboard.training')}
            disabled={isLoading}
          />
        </div>
        {error && (
          <p className="text-[16px] font-medium text-red-500">* {error}</p>
        )}
      </div>
    </Modal>
  );
};

export default TrainModal;

