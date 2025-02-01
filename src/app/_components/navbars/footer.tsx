'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import LinkedinSVG from '../svgs/guest/footer/linkedin';
import Link from 'next/link';
import InstagramSVG from '../svgs/guest/footer/instagram';
import FacebookSVG from '../svgs/guest/footer/facebook';
import { contentFont } from '@app/_utils/fonts';
import PhoneSVG from '../svgs/guest/footer/phone';
import XSVG from '../svgs/guest/footer/x';
import EmailSVG from '../svgs/guest/footer/email';
import GoogleButton from '../(guest)/common/google-button';

const Footer = () => {
  const t = useTranslations();
  const data = [
    {
      text: t('navbar.home'),
      href: '/',
    },
    {
      text: t('navbar.services'),
      href: '/services',
    },
    {
      text: t('navbar.solutions'),
      href: '/solutions',
    },
    {
      text: t('navbar.pricing'),
      href: '/pricing',
    },
    {
      text: t('navbar.about'),
      href: '/about',
    },
    {
      text: t('navbar.contact'),
      href: '/contact',
    },
  ];

  const contactData = [
    {
      text: '(+20)1094748526',
      icon: PhoneSVG,
      href: 'wa/+201098536400',
    },
    {
      text: 'archiivaii@gmail.com',
      icon: EmailSVG,
      href: 'mailto:archiivaii@gmail.com',
    },
  ];
  return (
    <footer className={clsx('font-content')}>
      <div className={clsx('bg-goldLinear py-64px')}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-48px">
          <div>
            <p>
              <Link href={'/'}> {t('logo')}</Link>
            </p>
            <p className="text-18px font-medium mt-24px mb-42px">
              {t('footer.slogan')}
            </p>
            <div className="flex items-center gap-24px">
              <Link
                href={'https://www.linkedin.com'}
                className="hover:opacity-70 duration-500">
                <LinkedinSVG />
              </Link>
              <Link
                href={'https://www.instagram.com'}
                className="hover:opacity-70 duration-500">
                <InstagramSVG />
              </Link>
              <Link
                href={'https://www.facebook.com'}
                className="hover:opacity-70 duration-500">
                <FacebookSVG />
              </Link>
              <Link
                href={'https://www.x.com'}
                className="hover:opacity-70 duration-500">
                <XSVG />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-16px">
            <h3 className="text-22px font-medium text-mainColor1">
              {t('footer.quick')}
            </h3>
            {data.map((item) => {
              return (
                <Link
                  className="text-mainColor1 text-18px hover:opacity-70 duration-500"
                  key={item.text}
                  href={item.href}>
                  {item.text}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-16px">
            <h3 className="text-22px font-medium text-mainColor1">
              {t('footer.contact')}
            </h3>
            {contactData.map((item) => {
              return (
                <Link
                  key={item.text}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-8px',
                    'hover:opacity-70 duration-500',
                  )}>
                  <item.icon />
                  <p className="text-18px text-mainColor1">{item.text}</p>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-24px">
            <h3 className="text-22px font-medium text-mainColor1">
              {t('footer.download')}
            </h3>
            <GoogleButton variant="footer" />
          </div>
        </div>
      </div>
      <div className="text-textLight text-26px py-32px text-center">
        &copy; {new Date().getFullYear()} {t('footer.copyright')}
      </div>
    </footer>
  );
};

export default Footer;

