import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const usePersonalInfoSchema = () => {
  const t = useTranslations();

  const personalInfoSchema = z.object({
    firstName: z.string().min(6, t('employees.firstNameError')),
    lastName: z.string().min(6, t('employees.lastNameError')),
    email: z.string().email(t('employees.emailError')),
  });

  return personalInfoSchema;
};

