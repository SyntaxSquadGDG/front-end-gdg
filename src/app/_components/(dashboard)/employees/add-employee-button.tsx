'use client';
import React from 'react';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';

const AddEmployeeButton = ({ toRole, roleId, full = true }) => {
  const t = useTranslations();
  const { openModal, closeModal, modalStack } = useModal();

  if (toRole) {
    return (
      <Button
        variant="outline"
        SVG={Add2SVG}
        text={full ? t('employees.addButton') : null}
        onClick={() => openModal(`addemployeeTorole${roleId}`)}
      />
    );
  }
  return (
    <Button
      variant="outline"
      SVG={Add2SVG}
      type="link"
      href="/employees/new"
      text={t('employees.addButton')}
      onClick={() => console.log('S')}
    />
  );
};

export default AddEmployeeButton;

