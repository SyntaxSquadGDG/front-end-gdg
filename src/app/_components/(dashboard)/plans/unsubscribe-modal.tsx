'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Modal from '../modals/modal';
import Button from '../general/button';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { unsubscribePlan } from './data/posts';
import ErrorAction from '../general/error-action';
import { revalidatePathAction } from '@app/actions';
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';

const UnsubscribeModal = ({ plan }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);

  function unsubscribe() {
    setErrorText(null);
    mutation.mutate();
  }

  const mutation = useMutation({
    mutationFn: () => unsubscribePlan({ plan: plan }),
    onSuccess: async () => {
      toast.success(
        `${t('plans.unsubscribedSuccessfully')} ${t(`plans.${plan}`)} ${t(
          'general.successfully',
        )}`,
      );
      await revalidatePathAction('/plans');
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `plans.errors.${error?.message}`,
        `plans.errors.UNSUBSCRIBE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  function close() {
    setErrorText(null);
    closeModal();
  }

  return (
    <Modal
      isOpen={modalStack.includes(`unsubscribePlans${plan}`)}
      onClose={close}
      className={clsx('font-content')}>
      <div className="text-center flex flex-col justify-center gap-32px">
        <div>
          <h2 className="text-32px font-medium">
            {t('plans.modals.unsubscribeHead')}
          </h2>
          <p className="text-24px ">
            {t('plans.modals.unsubscribeDescription')}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/plans/unsubscribe.png" alt="" />
        </div>
        <p className="text-24px">{t('plans.modals.unsubscribeSure')}</p>
        <div className="flex items-center gap-24px w-[100%]">
          <Button
            text={t('general.no')}
            onClick={() => closeModal()}
            className={'w-[100%]'}
            isPending={mutation.isPending}
          />
          <Button
            variant="outline"
            text={t('general.yes')}
            className={'w-[100%]'}
            isPendingText={t('plans.modals.unsubscribing')}
            isPending={mutation.isPending}
            onClick={unsubscribe}
          />
        </div>
        <ErrorAction>{errorText}</ErrorAction>
      </div>
    </Modal>
  );
};

export default UnsubscribeModal;

