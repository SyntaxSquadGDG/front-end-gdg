'use client';
import React from 'react';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { useTranslations } from 'next-intl';

const AddRoleButton = () => {
  const t = useTranslations();
  return (
    <Button
      variant="outline"
      SVG={Add2SVG}
      text={t('roles.addButton')}
      onClick={() => console.log('S')}
    />
  );
};

export default AddRoleButton;

