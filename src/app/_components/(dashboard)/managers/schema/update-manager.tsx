import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useUpdateManagerSchema = () => {
  const t = useTranslations();

  const updateManagerSchema = z.object({
    firstName: z.string().min(6, t('managers.firstNameError')),
    lastName: z.string().min(6, t('managers.lastNameError')),
    email: z.string().email(t('managers.emailError')),
  });

  return updateManagerSchema;
};

