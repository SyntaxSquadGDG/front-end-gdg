'use client';
import React from 'react';
import SetupSVG from '@/app/_components/svgs/dashboard/setup';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import { useModal } from '@app/_contexts/modal-provider';
import Button from '../general/button';

const TrainButton = () => {
  const t = useTranslations();
  const { openModal } = useModal();

  return (
    <Button
      variant="fill"
      onClick={() => openModal('trainModal')}
      SVG={SetupSVG}
      SVGFirst={true}
      text={t('dashboard.setupButton')}
    />
  );
};

export default TrainButton;

