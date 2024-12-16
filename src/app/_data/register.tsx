import { useTranslations } from 'next-intl';

export const types = ['personal', 'non-personal'] as const;
export const sizes = ['personal', 'non-personal'] as const;
export const have = ['personal', 'non-personal'] as const;
export const files = ['personal', 'non-personal'] as const;
export const when = ['personal', 'non-personal'] as const;
export const employees = ['personal', 'non-personal'] as const;

export const useRegisterValues = () => {
  const t = useTranslations();
  const typesOptions = [
    { label: t('forms.register.typeOptions.personal'), value: types[0] },
    { label: t('forms.register.typeOptions.nonPersonal'), value: types[1] },
  ];
  const sizesOptions = [
    { label: t('forms.register.sizeOptions.personal'), value: sizes[0] },
    { label: t('forms.register.sizeOptions.nonPersonal'), value: sizes[1] },
  ];
  const haveOptions = [
    { label: t('forms.register.haveOptions.personal'), value: have[0] },
    { label: t('forms.register.haveOptions.nonPersonal'), value: have[1] },
  ];
  const fileOptions = [
    { label: t('forms.register.filesOptions.personal'), value: files[0] },
    { label: t('forms.register.filesOptions.nonPersonal'), value: files[1] },
  ];
  const whenOptions = [
    { label: t('forms.register.whenOptions.personal'), value: when[0] },
    { label: t('forms.register.whenOptions.nonPersonal'), value: when[1] },
  ];
  const employeesOptions = [
    {
      label: t('forms.register.employeesOptions.personal'),
      value: employees[0],
    },
    {
      label: t('forms.register.employeesOptions.nonPersonal'),
      value: employees[1],
    },
  ];

  return {
    typesOptions,
    sizesOptions,
    haveOptions,
    fileOptions,
    whenOptions,
    employeesOptions,
  };
};

