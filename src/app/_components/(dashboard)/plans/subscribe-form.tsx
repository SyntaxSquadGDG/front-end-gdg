'use client';
import { usePaymentSchema } from '@app/_schemas/payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '../general/checkbox';
import Input from '../general/input';
import Button from '../general/button';

const SubscribeForm = ({ setActivePage }) => {
  const t = useTranslations();
  const paymentSchema = usePaymentSchema();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  function onSuccess(data) {
    console.log(data);
    setActivePage(-1);
  }

  function onError() {}

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32px gap-y-32px">
          <Input
            label={t('plans.payment.holderLabel')}
            placeHolder={t('plans.payment.holderPlaceholder')}
            type={'text'}
            {...register('holder')}
            error={errors.holder?.message}
          />
          <Input
            label={t('plans.payment.numberLabel')}
            placeHolder={t('plans.payment.numberPlaceholder')}
            type={'text'}
            {...register('number')}
            error={errors.number?.message}
          />
          <Input
            label={t('plans.payment.expiryLabel')}
            placeHolder={t('plans.payment.expiryPlaceholder')}
            type={'text'}
            {...register('expiry')}
            error={errors.expiry?.message}
          />
          <Input
            label={t('plans.payment.cvcLabel')}
            placeHolder={t('plans.payment.cvcPlaceholder')}
            type={'text'}
            {...register('cvc')}
            error={errors.cvc?.message}
          />

          <Controller
            name="remember"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox label={t('plans.payment.remember')} {...field} />
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-24px lg:flex-row flex-col mt-48px">
          <Button
            variant="outline"
            className={'w-[100%] lg:w-fit lg:px-[77px] lg:py-14px'}
            text={t('plans.payment.backButton')}
            onClick={() => setActivePage(1)}
          />
          <Button
            className={'w-[100%] lg:w-fit lg:px-[77px] lg:py-14px'}
            text={t('plans.payment.payButton')}
          />
        </div>
      </form>
    </div>
  );
};

export default SubscribeForm;

