import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useNewManagerSchema = () => {
  const t = useTranslations();

  const newManagerSchema = z.object({
    firstName: z.string().min(6, t('managers.firstNameError')),
    lastName: z.string().min(6, t('managers.lastNameError')),
    email: z.string().email(t('managers.emailError')),
    password: z.string().min(6, t('managers.passwordError')),
  });

  return newManagerSchema;
};

