'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '../general/button';
import { useModal } from '@app/_contexts/modal-provider';

const ViewMetadataButton = ({ id }) => {
  const t = useTranslations();
  const { openModal } = useModal();

  return (
    <Button
      text={t('files.viewMetaData')}
      onClick={() => openModal(`FileMetadata${id}`)}
      variant="fill"
    />
  );
};

export default ViewMetadataButton;

