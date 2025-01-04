'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '../general/button';

const ViewMetadataButton = () => {
  const t = useTranslations();

  return (
    <Button text={t('files.viewMetaData')} onClick={() => {}} variant="fill" />
  );
};

export default ViewMetadataButton;

