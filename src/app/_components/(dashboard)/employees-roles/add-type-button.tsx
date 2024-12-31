'use client';
import React from 'react';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';

const AddTypeButton = ({ fromType, addingType, typeId, full = true }) => {
  const t = useTranslations();
  const { openModal, closeModal, modalStack } = useModal();
  const isEmployee = addingType === 'employee';
  const text = isEmployee ? t('employees.addButton') : t('roles.addButton');

  if (addingType) {
    return (
      <Button
        variant="outline"
        SVG={Add2SVG}
        text={full ? text : null}
        onClick={() => openModal(`add${addingType}To${fromType}${typeId}`)}
      />
    );
  }
  return (
    <Button
      variant="outline"
      SVG={Add2SVG}
      type="link"
      href={`/${isEmployee ? 'employees' : 'roles'}/new`}
      text={text}
      onClick={() => console.log('S')}
    />
  );
};

export default AddTypeButton;

