'use client';
import React from 'react';
import Button from '../general/button';
import Add2SVG from '@app/_components/svgs/general/add2';
import { useTranslations } from 'next-intl';

const AddManagerButton = () => {
  const t = useTranslations();
  return (
    <Button
      type="link"
      href="/managers/new"
      variant="outline"
      SVG={Add2SVG}
      text={t('managers.addButton')}
      onClick={() => console.log('S')}
    />
  );
};

export default AddManagerButton;

