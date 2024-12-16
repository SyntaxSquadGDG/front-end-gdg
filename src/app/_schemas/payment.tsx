import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const usePaymentSchema = () => {
  const t = useTranslations();

  const paymentSchema = z.object({
    holder: z.string().min(6, t('plans.payment.holderError')),
    number: z.string().min(6, t('plans.payment.numberError')),
    expiry: z.string().min(6, t('plans.payment.expiryError')),
    cvc: z.string().min(6, t('plans.payment.cvcError')),
    remember: z.boolean(),
  });

  return paymentSchema;
};

