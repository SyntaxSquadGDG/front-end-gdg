'use client';

import React, { useState } from 'react';
import HeadText from '../general/headtext';
import Input from '../general/input';
import { useTranslations } from 'next-intl';
import Button from '../general/button';
import LockModal from './lock-file-modal';
import { revalidatePathAction } from '@app/actions';
import { useModal } from '@app/_contexts/modal-provider';
import { LockFile, lockFile, unlockFile } from './data/posts';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { getErrorText } from '@app/_utils/translations';

const FileInfo = ({ id, lockType }) => {
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);
  const { closeModal, openModal } = useModal();
  const willLock = lockType === 'lock';

  function handleClose() {
    setErrorText(null);
  }

  async function handleLockFile() {
    setErrorText(null);
    lockMutation.mutate();
  }

  const lockMutation = useMutation({
    mutationFn: () => (willLock ? lockFile(id) : unlockFile(id)),
    onSuccess: async () => {
      await revalidatePathAction(`/files/${id}`);
      if (willLock) {
        toast.success(t('files.locked'));
      } else {
        toast.success(t('files.unlocked'));
      }
      handleClose();
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `files.errors.${error?.message}`,
        willLock
          ? `files.errors.FILE_LOCK_ERROR`
          : `files.errors.FILE_UNLOCK_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <div className="flex flex-col gap-24px">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-24px md:gap-48px">
        <div className="flex-grow w-full">
          <HeadText bigSpace={false}>{t('files.documentId')}</HeadText>
          <Input readOnly={true} value={id} />
        </div>
        <div className="flex-grow w-full">
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
          className={'w-full md:w-fit md:px-40px'}
          // expand={true}
          isPending={lockMutation.isPending}
        />
        <LockModal
          error={errorText}
          isLocking={lockMutation.isPending}
          fileId={id}
          type={lockType}
          onClick={handleLockFile}
        />
      </div>
    </div>
  );
};

export default FileInfo;

