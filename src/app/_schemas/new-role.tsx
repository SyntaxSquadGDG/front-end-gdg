import { useTranslations } from 'next-intl';
import { number, z } from 'zod';

export const useNewRoleSchema = () => {
  const t = useTranslations();

  const newRoleSchema = z.object({
    name: z.string().min(6, t('roles.nameError')),
    employees: z.array(z.number()),
  });

  return newRoleSchema;
};

