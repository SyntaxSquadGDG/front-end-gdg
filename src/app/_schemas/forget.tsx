import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useForgetSchema = () => {
  const t = useTranslations();

  const forgetSchema = z.object({
    email: z.string().email(t('forms.forget.emailError')),
  });

  return forgetSchema;
};

