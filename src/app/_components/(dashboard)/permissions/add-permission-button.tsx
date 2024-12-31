'use client';
import React from 'react';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';

const AddPermissionButton = ({ type, id, full = true }) => {
  const t = useTranslations();
  const { openModal } = useModal();
  return (
    <Button
      variant="outline"
      SVG={Add2SVG}
      type="button"
      text={full ? t('permissions.addPermission') : null}
      onClick={() => openModal(`add${type}Permission${id}`)}
    />
  );
};

export default AddPermissionButton;

