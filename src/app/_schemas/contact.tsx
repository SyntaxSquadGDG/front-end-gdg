import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useContactSchema = () => {
  const t = useTranslations();

  const contactSchema = z.object({
    name: z.string().min(1, t('contact.form.nameError')),
    email: z.string().email(t('contact.form.emailError')),
    message: z.string().min(1, t('contact.form.messageError')),
  });

  return contactSchema;
};

