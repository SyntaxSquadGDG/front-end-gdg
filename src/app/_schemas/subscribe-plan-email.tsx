import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useSubscribeEmailSchema = () => {
  const t = useTranslations();

  const subscribeEmailSchema = z.object({
    email: z.string().email(t('plans.modals.emailError')),
  });

  return subscribeEmailSchema;
};

