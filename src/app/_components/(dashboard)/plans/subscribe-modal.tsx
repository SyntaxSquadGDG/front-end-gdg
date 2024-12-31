'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Modal from '../modals/modal';
import Button from '../general/button';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EmailSVG from '@app/_components/svgs/dashboard-inputs/email';
import Input from '../general/input';
import { useSubscribeSchema } from './schema/subscribe';
import toast from 'react-hot-toast';
import { SubscribePlan } from './data/posts';
import { revalidatePathAction } from '@app/actions';

const SubscribeModal = ({ plan }) => {
  const { modalStack, closeModal } = useModal();
  const subscribeSchema = useSubscribeSchema();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });

  async function onSuccessHandler() {
    toast.success(
      `${t('plans.subscribedSuccessfully')} ${t(`plans.${plan}`)} ${t(
        'general.successfully',
      )}`,
    );
    await revalidatePathAction('/plans');
    closeModal();
    reset();
  }

  async function onSuccess(data) {
    console.log(data);
    const res = await SubscribePlan(
      { plan: plan },
      setIsLoading,
      setError,
      onSuccessHandler,
    );

    console.log(res);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Modal
      isOpen={modalStack.includes(`subscribePlans${plan}`)}
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
            isPending={isLoading}
          />
          <Button
            text={t('plans.modals.subscribeButton')}
            className={'w-[100%]'}
            isPending={isLoading}
            isPendingText={t('plans.subscribing')}
          />
        </form>
      </div>
    </Modal>
  );
};

export default SubscribeModal;

