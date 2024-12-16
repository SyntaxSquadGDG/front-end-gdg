import { useTranslations } from 'next-intl';
import { number, z } from 'zod';

export const useNewEmployeeSchema = () => {
  const t = useTranslations();

  const newEmployeeSchema = z.object({
    firstName: z.string().min(6, t('employees.firstNameError')),
    lastName: z.string().min(6, t('employees.lastNameError')),
    email: z.string().email(t('employees.emailError')),
    password: z.string().min(6, t('employees.passwordError')),
    roles: z.array(z.number()),
  });

  return newEmployeeSchema;
};

