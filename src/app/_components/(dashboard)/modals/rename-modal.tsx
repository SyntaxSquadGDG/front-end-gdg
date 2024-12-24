'use client';
import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import React from 'react';
import Modal from './modal';
import Button from '../general/button';
import { zodResolver } from '@hookform/resolvers/zod';
import useRenameSchema from '@app/_schemas/rename-schema';
import { useForm } from 'react-hook-form';
import Input from '../general/input';

const RenameModal = ({ modalName, head, onClick, isRenaming }) => {
  const { modalStack, closeModal } = useModal();
  const t = useTranslations();
  const renameSchema = useRenameSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(renameSchema),
  });

  function onSubmit(data) {
    onClick(data);
  }

  function handleCloseModal() {
    closeModal();
    reset();
  }

  return (
    <Modal
      isOpen={modalStack.includes(modalName)}
      onClose={closeModal}
      className={contentFont.className}>
      <div className="flex flex-col gap-[24px] ">
        <p className="text-[20px] font-medium">{head}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeHolder={t('placeholders.rename')}
            type={'text'}
            {...register('name')}
            error={errors.name?.message}
          />

          <div className="flex items-center gap-[32px] mt-[32px] justify-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleCloseModal();
              }}
              text={t('general.cancel')}
              variant="solid"
            />
            <Button
              text={t('general.ok')}
              className={'min-w-[100px]'}
              disabled={isRenaming}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RenameModal;

