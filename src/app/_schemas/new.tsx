import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useNewPasswordSchema = () => {
  const t = useTranslations();

  const newSchema = z.object({
    new: z.string().min(6, t('forms.new.newError')),
    confirm: z.string().min(6, t('forms.new.newError')),
  });

  return newSchema;
};

