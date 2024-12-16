import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useLoginSchema = () => {
  const t = useTranslations();

  const loginSchema = z.object({
    company: z.string().min(1, t('forms.login.companyError')),
    email: z.string().email(t('forms.login.emailError')),
    password: z.string().min(6, t('forms.login.passwordError')),
    remember: z.boolean(),
  });

  return loginSchema;
};
