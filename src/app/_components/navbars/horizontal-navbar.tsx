'use client';
import { formatDate } from '@/app/_utils/formats';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NotificationsSVG from '../svgs/navbars/notifications';
import SearchSVG from '../svgs/navbars/search';
import clsx from 'clsx';
import Link from 'next/link';
import { headFont } from '@/app/_utils/fonts';

const HorizontalNavbar = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="h-[104px] rounded-bl-[40px] rounded-br-[40px] w-[calc(100vw-132px)] lg:w-[calc(100vw-245px-32px)] fixed top-0 right-0 lg:right-[32px] bg-gradient-to-b from-blue1 to-blue2 items-center flex">
      <div
        className={
          "absolute inset-0 bg-[url('/images/navbar/background.png')] bg-cover bg-no-repeat mix-blend-multiply z-0 rounded-bl-[40px] rounded-br-[40px]"
        }
      />

      <div className="relative z-5 text-textLight flex justify-between items-center w-[100%] px-[24px] h-[100%]">
        {/* IMAGE + TEXT */}
        <div className="flex gap-[16px] items-center">
          {/* IMAGE */}
          <div className="shrink-0">
            <img
              src="/images/defaults/user.png"
              className="w-[24px] h-[24px] sm:w-[56px] sm:h-[56px]"
              // width={56}
              // height={56}
              alt=""
            />
          </div>

          {/* TEXT */}
          <div className={clsx('flex flex-col gap-[10px]', headFont.className)}>
            <p className="text-[12px] lg:text-[24px]">
              {t('navbar.hello')} Ahmed!
            </p>
            <p className="text-[12px] lg:text-[14px]">
              {formatDate(Date.now())}
            </p>
          </div>
        </div>

        <button
          className="flex lg:hidden mx-[8px]"
          onClick={() => setIsOpen((old) => !old)}>
          =
        </button>

        <div
          className={clsx(
            isOpen &&
              'flex absolute top-[84px] left-0 w-[100%] bg-gradient-to-r from-blue1 to-blue2  rounded-bl-[16px] rounded-br-[16px] py-[16px] px-[24px]',
            'gap-[16px] items-center justify-between flex',
            'lg:static lg:w-auto lg:px-0 lg:py-0 lg:rounded-none lg:bg-none',
            !isOpen && 'hidden lg:flex',
          )}>
          {/* SEARCH */}
          <div
            className={clsx(
              'flex gap-[8px] py-[10px] px-[16px] rounded-[16px] border-[1px] border-white border-solid',
              isOpen && 'w-[100%]',
            )}>
            <SearchSVG />
            <input
              type="text"
              placeholder={t('navbar.search')}
              className={clsx(
                'bg-transparent outline-none sm:w-auto flex-shrink w-[100%] text-[16px]',
                headFont.className,
              )}
            />
          </div>
          <Link href={'/notifications'}>
            <NotificationsSVG />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;

