'use client';

import React from 'react';
import FormSection from '../common/form-section';
import { useTranslations } from 'next-intl';
import EmailSVG from '@app/_components/svgs/guest/forms/email';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import GuestButton from '@app/_components/general/guest-button';
import Input from '../common/input';

const Forget = () => {
  const t = useTranslations();

  const forgetSchema = z.object({
    email: z.string().email(t('forms.forget.emailError')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormSection>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:flex-row flex-col w-[100%] items-center gap-[48px]">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/images/guest/forms/forget.png" alt="" />
        </div>
        <div className="w-[100%]">
          <h2
            className={clsx(
              contentFont.className,
              'text-[30px] font-bold linearGuestText2 mb-[32px]',
            )}>
            {t('forms.forget.head')}
          </h2>
          <div className="flex flex-col gap-[24px]">
            <Input
              SVG={EmailSVG}
              label={t('forms.forget.emailLabel')}
              placeHolder={t('forms.forget.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              error={errors.email?.message}
            />
            <p className="text-textLight text-[20px]">
              {t('forms.forget.notifications')}
            </p>
          </div>
          <GuestButton className={'w-[100%] mt-[40px] mb-[32px]'}>
            {t('general.send')}
          </GuestButton>
        </div>
      </form>
    </FormSection>
  );
};

export default Forget;

