'use client';
import React from 'react';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { useTranslations } from 'next-intl';

const AddEmployeeButton = () => {
  const t = useTranslations();
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

