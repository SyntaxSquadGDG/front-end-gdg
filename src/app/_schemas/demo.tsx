import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useDemoSchema = () => {
  const t = useTranslations();

  const demoSchema = z.object({
    name: z.string().min(1, t('demo.form.nameError')),
    email: z.string().email(t('demo.form.emailError')),
    company: z.string().min(1, t('demo.form.companyError')),
    country: z.string().min(1, t('demo.form.emailError')),
    message: z.string().min(1, t('demo.form.messageError')),
  });

  return demoSchema;
};

