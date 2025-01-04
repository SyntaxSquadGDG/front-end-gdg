'use client';

import React, { useState } from 'react';
import HeadText from '../general/headtext';
import Input from '../general/input';
import { useTranslations } from 'next-intl';
import Button from '../general/button';
import LockModal from './lock-file-modal';
import { revalidatePathAction } from '@app/actions';
import { useModal } from '@app/_contexts/modal-provider';
import { LockFile } from './data/posts';
import toast from 'react-hot-toast';

const FileInfo = ({ id, lockType }) => {
  const t = useTranslations();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal, openModal } = useModal();

  function handleClose() {
    setError(null);
    setIsLoading(false);
  }

  async function onSuccess() {
    await revalidatePathAction(`/files/${id}`);
    if (lockType === 'lock') {
      toast.success(t('files.locked'));
    } else {
      toast.success(t('files.unlocked'));
    }
    handleClose();
    closeModal();
  }

  async function lock() {
    await LockFile(id, lockType, setIsLoading, setError, onSuccess, t, toast);
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex justify-between items-center flex-col md:flex-row gap-[24px] md:gap-[48px]">
        <div className="flex-grow">
          <HeadText bigSpace={false}>{t('files.documentId')}</HeadText>
          <Input readOnly={true} value={id} />
        </div>
        <div className="flex-grow">
          <HeadText bigSpace={false}>{t('files.ocrLanguage')}</HeadText>
          <Input readOnly={true} value={'English'} />
        </div>
      </div>
      <div>
        <HeadText bigSpace={false}>{t('files.lock')}</HeadText>
        <Button
          text={t('files.lockButton')}
          onClick={() => openModal(`LockFile${id}`)}
          variant="fill"
          expand={true}
        />
        <LockModal
          error={error}
          isLocking={isLoading}
          fileId={id}
          type={lockType}
          onClick={lock}
        />
      </div>
    </div>
  );
};

export default FileInfo;

