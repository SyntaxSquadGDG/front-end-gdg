import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useChangePasswordSchema = () => {
  const t = useTranslations();

  const changePasswordSchema = z.object({
    current: z.string().min(6, t('profile.changePassword.currentError')),
    new: z.string().min(6, t('profile.changePassword.newError')),
  });

  return changePasswordSchema;
};

