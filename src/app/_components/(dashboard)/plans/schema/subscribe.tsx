import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useSubscribeSchema = () => {
  const t = useTranslations();

  const subscribeSchema = z.object({
    email: z.string().email(t('plans.modals.emailError')),
  });

  return subscribeSchema;
};

