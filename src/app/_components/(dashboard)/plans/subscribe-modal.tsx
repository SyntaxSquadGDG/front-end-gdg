'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React from 'react';
import Modal from '../modals/modal';
import Button from '../general/button';
import clsx from 'clsx';
import { useSubscribeEmailSchema } from '@app/_schemas/subscribe-plan-email';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EmailSVG from '@app/_components/svgs/dashboard-inputs/email';
import Input from '../general/input';

const SubscribeModal = () => {
  const { modalStack, closeModal } = useModal();
  const subscribeEmailSchema = useSubscribeEmailSchema();
  const t = useTranslations();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeEmailSchema),
  });

  function onSuccess(data) {
    console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Modal
      isOpen={modalStack.includes('subscribePlans')}
      onClose={closeModal}
      className={clsx(contentFont.className)}>
      <div className="text-center flex flex-col justify-center gap-[32px]">
        <div>
          <h2 className="text-[32px] font-medium">
            {t('plans.modals.subscribeHead')}
          </h2>
          <p className="text-[24px] text-secondText mt-[40px] mb-[32px]">
            {t('plans.modals.subscribeDescription')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSuccess, onError)}
          className="flex flex-col gap-[40px]">
          <Input
            label={t('plans.modals.emailLabel')}
            placeHolder={t('plans.modals.emailPlaceholder')}
            type={'text'}
            {...register('email')}
            error={errors.email?.message}
            SVG={EmailSVG}
          />
          <Button
            text={t('plans.modals.subscribeButton')}
            className={'w-[100%]'}
          />
        </form>
      </div>
    </Modal>
  );
};

export default SubscribeModal;

