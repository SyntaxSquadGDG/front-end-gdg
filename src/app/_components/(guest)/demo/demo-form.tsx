'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '../common/input';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import clsx from 'clsx';
import OverlaySection from '../common/overlay-section';
import { contentFont } from '@app/_utils/fonts';
import { useDemoSchema } from '@app/_schemas/demo';
import DemoFormSuccess from './demo-form-success';
import { useMutation } from '@tanstack/react-query';
import { demo } from './data/posts';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import ErrorAction from '../common/error-action';
import Transition from '@app/_components/transitions/transitions';

const DemoForm = () => {
  const t = useTranslations();
  const demoSchema = useDemoSchema();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const shows = [
    t('demo.form.show1'),
    t('demo.form.show2'),
    t('demo.form.show3'),
    t('demo.form.show4'),
    t('demo.form.show5'),
    t('demo.form.show6'),
  ];

  const steps = [
    t('demo.form.step1'),
    t('demo.form.show2'),
    t('demo.form.show3'),
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(demoSchema),
  });

  async function onSuccess(data) {
    setErrorText(null);
    mutation.mutate(data);
  }

  function onError() {}

  const mutation = useMutation({
    mutationFn: (data) => demo(data),
    onSuccess: async () => {
      setIsSuccess(true);
      toast.success(t('demo.form.successHead'));
      reset();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `demo.errors.${error?.message}`,
        `demo.errors.DEMO_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <section
      className={clsx(
        'relative pb-sectionPadding mt-[calc(0px-var(--sectionPadding))]',
      )}>
      <Transition from="down">
        <div className="container">
          <div
            className={clsx(
              'p-72px relative rounded-[32px] overflow-hidden border-[1px] border-solid border-secondaryColor1 flex gap-72px justify-between text-textLight flex-col lg:flex-row',
              'font-content',
            )}>
            <OverlaySection className={'bg-guestLinear'} fullSection={false} />
            {isSuccess && <DemoFormSuccess />}
            {!isSuccess && (
              <>
                <div className="w-[100%] flex flex-col gap-72px">
                  <div>
                    <h2 className="text-30px font-semibold mb-32px">
                      {t('demo.form.showHead')}
                    </h2>
                    <ul className="flex flex-col gap-24px pl-20px list-disc">
                      {shows.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })}
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-32px text-30px font-medium">
                      {t('demo.form.stepsHead')}
                    </h2>
                    <ol className="flex gap-24px flex-col pl-20px list-decimal">
                      {steps.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })}
                    </ol>
                  </div>
                </div>
                <div className="w-[100%] flex flex-col gap-24px">
                  <h3 className="text-30px font-semibold">
                    {t('demo.form.formHead')}
                  </h3>
                  <form
                    onSubmit={handleSubmit(onSuccess, onError)}
                    className="flex flex-col gap-16px">
                    <Input
                      label={t('demo.form.nameLabel')}
                      placeHolder={t('demo.form.namePlaceholder')}
                      type={'text'}
                      disabled={mutation.isPending}
                      {...register('name')}
                      error={errors.name?.message}
                    />

                    <Input
                      label={t('demo.form.emailLabel')}
                      placeHolder={t('demo.form.emailPlaceholder')}
                      type={'text'}
                      disabled={mutation.isPending}
                      {...register('email')}
                      error={errors.email?.message}
                    />

                    <Input
                      label={t('demo.form.companyLabel')}
                      placeHolder={t('demo.form.companyPlaceholder')}
                      type={'text'}
                      disabled={mutation.isPending}
                      {...register('company')}
                      error={errors.company?.message}
                    />

                    <Input
                      label={t('demo.form.countryLabel')}
                      placeHolder={t('demo.form.countryPlaceholder')}
                      type={'text'}
                      disabled={mutation.isPending}
                      {...register('country')}
                      error={errors.country?.message}
                    />

                    <Input
                      label={t('demo.form.messageLabel')}
                      placeHolder={t('demo.form.messagePlaceholder')}
                      type={'textarea'}
                      disabled={mutation.isPending}
                      {...register('message')}
                      error={errors.message?.message}
                    />

                    <GuestButton
                      className={'w-[100%] mt-32px'}
                      disabled={mutation.isPending}>
                      {mutation.isPending
                        ? t('demo.form.demoing')
                        : t('demo.form.demoButton')}
                    </GuestButton>
                    <ErrorAction>{errorText}</ErrorAction>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </Transition>
    </section>
  );
};

export default DemoForm;

