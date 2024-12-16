'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React from 'react';
import Modal from '../modals/modal';
import Button from '../general/button';
import clsx from 'clsx';

const UnsubscribeModal = () => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();

  return (
    <Modal
      isOpen={modalStack.includes('unsubscribePlans')}
      onClose={closeModal}
      className={clsx(contentFont.className)}>
      <div className="text-center flex flex-col justify-center gap-[32px]">
        <div>
          <h2 className="text-[32px] font-medium">
            {t('plans.modals.unsubscribeHead')}
          </h2>
          <p className="text-[24px] ">
            {t('plans.modals.unsubscribeDescription')}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/plans/unsubscribe.png" alt="" />
        </div>
        <p className="text-[24px]">{t('plans.modals.unsubscribeSure')}</p>
        <div className="flex items-center gap-[24px] w-[100%]">
          <Button
            text={t('general.no')}
            onClick={() => closeModal()}
            className={'w-[100%]'}
          />
          <Button
            variant="outline"
            text={t('general.yes')}
            className={'w-[100%]'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UnsubscribeModal;

