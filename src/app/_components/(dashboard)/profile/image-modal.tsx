'use client';

import { useModal } from '@app/_contexts/modal-provider';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import Modal from '../modals/modal';
import ErrorAction from '../general/error-action';

const ImageModal = ({
  image,
  loading,
  file,
  handleCancel,
  handleUpload,
  errorUpload,
}) => {
  const t = useTranslations();
  const { modalStack, closeModal } = useModal();

  return (
    <Modal
      isOpen={modalStack.includes('personalImage')}
      onClose={handleCancel}
      className={clsx(contentFont.className)}>
      <div className=" flex flex-col gap-[8px]">
        <h3 className="text-tertiaryButton text-[20px] font-bold">
          {t('profile.image.new')}
        </h3>
        {image && (
          <img
            src={image}
            alt="Selected Preview"
            className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] object-cover rounded-full mt-[38px] mb-[50px] mx-auto cursor-pointer"
            onClick={() => {
              const newTab = window.open();
              if (newTab) {
                newTab.document.body.innerHTML = `<img src="${image}" style="height:100%">`;
              }
            }}
          />
        )}

        <div className="modal-actions flex justify-center items-center flex-wrap">
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="cursor-pointer bg-[url('/images/service-background.png')] text-textNavBarPrimary text-[12px] px-4 py-2 rounded-md inline-block w-fit h-fit">
            {loading
              ? t('profile.image.uploading')
              : t('profile.image.confirm')}
          </button>
          <button
            onClick={handleCancel}
            className="text-tertiaryButton text-[14px] p-[12px] rounded-md w-fit h-fit">
            {t('general.cancel')}
          </button>
        </div>
        <ErrorAction>{errorUpload}</ErrorAction>
      </div>
    </Modal>
  );
};

export default ImageModal;

