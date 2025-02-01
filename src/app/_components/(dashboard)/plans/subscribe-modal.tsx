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
import { subscribePlan } from './data/posts';
import { revalidatePathAction } from '@app/actions';
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';
import ErrorAction from '../general/error-action';

const SubscribeModal = ({ plan }) => {
  const { modalStack, closeModal } = useModal();
  const subscribeSchema = useSubscribeSchema();
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });

  async function onSuccess(data) {
    console.log(data);
    const newData = {
      email: data.email,
      plan: plan,
    };
    setErrorText(null);
    mutation.mutate(newData);
  }

  function onError(errors) {
    console.log(errors);
  }

  const mutation = useMutation({
    mutationFn: (data) => subscribePlan(data),
    onSuccess: async () => {
      await revalidatePathAction('/plans');
      toast.success(
        `${t('plans.subscribedSuccessfully')} ${t(`plans.${plan}`)} ${t(
          'general.successfully',
        )}`,
      );
      await revalidatePathAction('/plans');
      reset();
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `plans.errors.${error?.message}`,
        `plans.errors.SUBSCRIBE_ERROR`,
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
      isOpen={modalStack.includes(`subscribePlans${plan}`)}
      onClose={close}
      className={clsx('font-content')}>
      <div className="text-center flex flex-col justify-center gap-32px">
        <div>
          <h2 className="text-32px font-medium">
            {t('plans.modals.subscribeHead')}
          </h2>
          <p className="text-24px text-secondText mt-40px mb-32px">
            {t('plans.modals.subscribeDescription')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSuccess, onError)}
          className="flex flex-col gap-40px">
          <Input
            label={t('plans.modals.emailLabel')}
            placeHolder={t('plans.modals.emailPlaceholder')}
            type={'text'}
            {...register('email')}
            error={errors.email?.message}
            SVG={EmailSVG}
            isPending={mutation.isPending}
          />
          <Button
            text={t('plans.modals.subscribeButton')}
            className={'w-[100%]'}
            isPending={mutation.isPending}
            isPendingText={t('plans.subscribing')}
          />
        </form>
        <ErrorAction>{errorText}</ErrorAction>
      </div>
    </Modal>
  );
};

export default SubscribeModal;

