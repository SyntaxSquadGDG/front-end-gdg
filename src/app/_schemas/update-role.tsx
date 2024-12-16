import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useUpdateRoleSchema = () => {
  const t = useTranslations();

  const updateRoleSchema = z.object({
    name: z.string().min(6, t('roles.nameLabel')),
  });

  return updateRoleSchema;
};

