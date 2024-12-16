import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useContactSchema = () => {
  const t = useTranslations();

  const contactSchema = z.object({
    name: z.string().email(t('contact.form.nameError')),
    email: z.string().email(t('contact.form.emailError')),
    message: z.string().email(t('contact.form.messageError')),
  });

  return contactSchema;
};

