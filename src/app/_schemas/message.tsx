import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useMessageSchema = () => {
  const t = useTranslations();

  const messageSchema = z.object({
    message: z.string().min(1, t('help.messageError')),
  });

  return messageSchema;
};

