'use client';

import React, { useState } from 'react';
import FormSection from '../common/form-section';
import { useTranslations } from 'next-intl';
import EmailSVG from '@app/_components/svgs/guest/forms/email';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import Input from '../common/input';
import PasswordSVG from '@app/_components/svgs/guest/forms/password';
import { useNewPasswordSchema } from '@app/_schemas/new';
import TempSection from '../common/temp-section';

const New = () => {
  const t = useTranslations();
  const newPasswordSchema = useNewPasswordSchema();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <FormSection>
        <TempSection
          description={null}
          head={t('forms.new.newSuccessHead')}
          redirect={'/'}
          src={'/images/guest/forms/password-changed.png'}
        />
      </FormSection>
    );
  }

  return (
    <FormSection>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:flex-row flex-col w-[100%] items-center gap-[48px]">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/images/guest/forms/new-password.png" alt="" />
        </div>
        <div className="w-[100%]">
          <h2
            className={clsx(
              contentFont.className,
              'text-[30px] font-bold linearGuestText2 mb-[32px]',
            )}>
            {t('forms.new.head')}
          </h2>
          <p
            className={clsx(
              contentFont.className,
              'text-[16px] font-medium text-textLight mt-[16px] mb-[32px]',
            )}>
            {t('forms.new.description')}
          </p>
          <div className="flex flex-col gap-[24px]">
            <Input
              SVG={PasswordSVG}
              label={t('forms.new.newLabel')}
              placeHolder={t('forms.new.newPlaceholder')}
              type={'password'}
              {...register('new')}
              error={errors.new?.message}
            />
            <Input
              SVG={PasswordSVG}
              label={t('forms.new.confirmLabel')}
              placeHolder={t('forms.new.confirmPlaceholder')}
              type={'password'}
              {...register('confirm')}
              error={errors.confirm?.message}
            />
          </div>
          <GuestButton className={'w-[100%] mt-[40px] mb-[32px]'}>
            {t('general.confirm')}
          </GuestButton>
        </div>
      </form>
    </FormSection>
  );
};

export default New;

