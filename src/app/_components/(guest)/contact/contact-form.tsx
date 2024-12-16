'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import ContactItem from './contact-item';
import AddressSVG from '@app/_components/svgs/guest/contact/address';
import PhoneSVG from '@app/_components/svgs/guest/contact/phone';
import EmailSVG from '@app/_components/svgs/guest/contact/email';
import IconCircle from './icon-circle';
import LinkedinSVG from '@app/_components/svgs/guest/contact/linkedin';
import FacebookSVG from '@app/_components/svgs/guest/contact/facebook';
import InstagramSVG from '@app/_components/svgs/guest/contact/instagram';
import XSVG from '@app/_components/svgs/guest/contact/x';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContactSchema } from '@app/_schemas/contact';
import Input from '../common/input';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import clsx from 'clsx';
import OverlaySection from '../common/overlay-section';
import { contentFont } from '@app/_utils/fonts';

const ContactForm = () => {
  const t = useTranslations();
  const contactSchema = useContactSchema();

  const contacts = [
    {
      SVG: AddressSVG,
      text: t('contact.form.addressText'),
    },
    {
      SVG: PhoneSVG,
      text: t('contact.form.phoneText'),
    },
    {
      SVG: EmailSVG,
      text: t('contact.form.emailText'),
    },
  ];

  const icons = [
    {
      SVG: LinkedinSVG,
      href: 'https://linkedin.com',
    },
    {
      SVG: FacebookSVG,
      href: 'https://facebook.com',
    },
    {
      SVG: InstagramSVG,
      href: 'https://instagram.com',
    },
    {
      SVG: XSVG,
      href: 'https://x.com',
    },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  function onSuccess() {}

  function onError() {}

  return (
    <section
      className={clsx(
        'relative pb-sectionPadding mt-[calc(0px-var(--sectionPadding))]',
      )}>
      <div
        className={clsx(
          'container p-[72px] relative rounded-[32px] overflow-hidden border-[1px] border-solid border-secondaryColor1 flex gap-[72px] justify-between text-textLight flex-col lg:flex-row',
          contentFont.className,
        )}>
        <OverlaySection className={'bg-guestLinear'} fullSection={false} />

        <div className="w-[100%] flex flex-col justify-between gap-[48px]">
          <div>
            <h2 className="text-[30px] font-semibold">
              {t('contact.form.head')}
            </h2>
            <p className="mt-[24px] mb-[32px] text-[24px]">
              {t('contact.form.description')}
            </p>
            <div className="flex flex-col gap-[24px]">
              {contacts.map((contact, index) => {
                return (
                  <ContactItem
                    key={index}
                    SVG={contact.SVG}
                    text={contact.text}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-[16px] text-[30px] font-medium">
              {t('contact.form.followText')}
            </h2>
            <div className="flex gap-[24px] items-center flex-wrap">
              {icons.map((icon, index) => {
                return (
                  <IconCircle key={index} SVG={icon.SVG} href={icon.href} />
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-[24px]">
          <h3 className="text-[30px] font-semibold">
            {t('contact.form.head2')}
          </h3>
          <form
            onSubmit={handleSubmit(onSuccess, onError)}
            className="flex flex-col gap-[16px]">
            <Input
              label={t('contact.form.nameLabel')}
              placeHolder={t('contact.form.namePlaceholder')}
              type={'text'}
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label={t('contact.form.emailLabel')}
              placeHolder={t('contact.form.emailPlaceholder')}
              type={'text'}
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label={t('contact.form.messageLabel')}
              placeHolder={t('contact.form.messagePlaceholder')}
              type={'textarea'}
              {...register('message')}
              error={errors.message?.message}
            />

            <GuestButton className={'w-[100%] mt-[32px]'}>
              {t('general.send')}
            </GuestButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
