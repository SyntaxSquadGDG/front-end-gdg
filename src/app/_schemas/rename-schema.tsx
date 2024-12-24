'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { z } from 'zod';

const useRenameSchema = () => {
  const t = useTranslations();

  const registerSchema = z.object({
    name: z.string().min(2, t('errors.rename')),
  });

  return registerSchema;
};

export default useRenameSchema;

