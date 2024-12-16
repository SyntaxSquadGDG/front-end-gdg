import {
  employees,
  files,
  have,
  sizes,
  types,
  when,
} from '@app/_data/register';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useRegisterSchema = () => {
  const t = useTranslations();

  const registerSchema = z.object({
    company: z.string().min(1, t('forms.register.companyError')),
    email: z.string().email(t('forms.register.emailError')),
    number: z.string().min(10, t('forms.register.numberError')),
    country: z.string().min(10, t('forms.register.countryError')),
    type: z.enum(types, { message: t('forms.register.typeError') }),
    size: z.enum(sizes, { message: t('forms.register.sizeError') }),
    have: z.enum(have, { message: t('forms.register.haveError') }),
    files: z.enum(files, { message: t('forms.register.filesError') }),
    when: z.enum(when, { message: t('forms.register.whenError') }),
    employees: z.enum(employees, {
      message: t('forms.register.employeesError'),
    }),
  });

  return registerSchema;
};

