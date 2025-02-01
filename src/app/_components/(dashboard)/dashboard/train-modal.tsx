'use client';

import React, { useState } from 'react';
import Modal from '../modals/modal';
import { useTranslations } from 'next-intl';
import { contentFont } from '@app/_utils/fonts';
import { useModal } from '@app/_contexts/modal-provider';
import Button from '../general/button';
import toast from 'react-hot-toast';
import { trainModel } from './data/posts';
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';
import ErrorAction from '../general/error-action';

const TrainModal = () => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);

  async function train() {
    setErrorText(null);
    mutation.mutate();
  }

  const mutation = useMutation({
    mutationFn: () => trainModel(),
    onSuccess: () => {
      toast.success(t('dashboard.trainSuccess'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `dashboard.errors.${error?.message}`,
        `dashboard.errors.TRAIN_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <Modal
      isOpen={modalStack.includes('trainModal')}
      onClose={closeModal}
      className={'font-content'}>
      <div className="flex flex-col gap-24px text-center items-center">
        <p className="text-20px font-medium">{t('dashboard.trainModalHead')}</p>
        <div className="flex items-center gap-32px">
          <Button
            onClick={() => closeModal()}
            text={t('general.cancel')}
            variant="solid"
            isPending={mutation.isPending}
          />
          <Button
            onClick={train}
            text={t('general.yes')}
            isPending={mutation.isPending}
            isPendingText={t('dashboard.training')}
          />
        </div>
        {errorText && <ErrorAction>{errorText}</ErrorAction>}
      </div>
    </Modal>
  );
};

export default TrainModal;

