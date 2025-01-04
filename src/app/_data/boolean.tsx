'use client';

import { useTranslations } from 'next-intl';

export const useBooleanValues = () => {
  const t = useTranslations();
  const booleanOptions = [
    { label: t('general.yes'), value: 'yes' },
    { label: t('general.no'), value: 'no' },
  ];

  return { booleanOptions };
};

