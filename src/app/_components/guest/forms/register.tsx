'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import FormSection from '../common/form-section';
import RegisterActive from './register-active';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import RegisterPage1 from './register-page1';
import RegisterPage2 from './register-page2';

const Register = () => {
  const t = useTranslations();
  const [activePage, setActivePage] = useState(1);

  const registerSchema = z.object({
    company: z.string().min(1, t('forms.register.companyError')),
    email: z.string().email(t('forms.register.emailError')),
    number: z.string().min(10, t('forms.register.numberError')),
    country: z.string().min(10, t('forms.register.countryError')),
    type: z.enum(['personal', 'non-personal'], { message: 'ERRORRR' }),
    size: z.enum(['personal', 'non-personal'], { message: 'ERRORRR' }),
    have: z.enum(['personal', 'non-personal'], { message: 'ERRORRR' }),
    files: z.enum(['personal', 'non-personal'], { message: 'ERRORRR' }),
    when: z.enum(['personal', 'non-personal'], { message: 'ERRORRR' }),
    employees: z.enum(['personal', 'non-personal'], { message: 'ERRORRR' }),
  });

  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormSection>
      <div>
        <RegisterActive activePage={activePage} />
      </div>
      <div className="mt-[80px] w-[100%]">
        {activePage === 1 && (
          <RegisterPage1
            register={register}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
            handleSubmit={handleSubmit}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 2 && (
          <RegisterPage2
            register={register}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
            handleSubmit={handleSubmit}
            setActivePage={setActivePage}
          />
        )}
      </div>
    </FormSection>
  );
};

export default Register;

