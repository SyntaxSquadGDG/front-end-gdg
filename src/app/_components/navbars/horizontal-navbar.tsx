'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import NotificationsSVG from '../svgs/navbars/notifications';
import SearchSVG from '../svgs/navbars/search';
import clsx from 'clsx';
import Link from 'next/link';
import { headFont } from '@/app/_utils/fonts';
import { formatDate } from '@/app/_utils/formats';
import OverlayImage from '../general/overlay';
import { getLangDir } from 'rtl-detect';
import useClickOutside from '@app/_hooks/useclickoutside';

const HorizontalNavbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  useClickOutside(navbarRef, () => setIsOpen(false));

  return (
    <nav
      ref={navbarRef}
      className={clsx(
        direction === 'ltr'
          ? 'right-0 lg:right-navsBodySpacing '
          : 'left-0 lg:left-navsBodySpacing',
        'text-textLight bg-mainDashboardLinear h-horizontalNavHeight rounded-bl-navsRadius rounded-br-navsRadius w-[calc(100vw-var(--verticalNavSmallWidth)-var(--navsBodySpacing))] lg:w-[calc(100vw-var(--verticalNavWidth)-2*var(--navsBodySpacing))] fixed top-0 items-center flex z-50',
      )}>
      <OverlayImage
        url="/images/navbar/background.png"
        className="rounded-br-navsRadius rounded-bl-navsRadius"
      />

      <div className="relative z-5 text-textLight flex justify-between items-center w-[100%] px-[24px] h-[100%]">
        {/* IMAGE + TEXT */}
        <div className="flex gap-[16px] items-center">
          {/* IMAGE */}
          <div className="shrink-0">
            <Image
              src="/images/defaults/user.png"
              className="w-[24px] h-[24px] sm:w-[56px] sm:h-[56px]"
              width={0}
              height={0}
              sizes="(max-width: 640px) 24px, 56px"
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
              `flex absolute top-searchBarTop left-0 w-[100%] ${
                direction === 'ltr'
                  ? 'bg-horizontalNavLinear'
                  : 'bg-horizontalNavLinearRTL'
              }  rounded-[16px] py-[16px] px-[24px]`,
            'gap-[16px] items-center justify-between flex',
            'lg:static lg:w-auto lg:px-0 lg:py-0 lg:rounded-none lg:bg-none',
            !isOpen && 'hidden lg:flex',
          )}>
          {/* SEARCH */}
          <div
            className={clsx(
              'flex gap-[8px] py-[10px] px-[16px] rounded-[16px] border-[1px] border-white border-solid w-[100%]',
            )}>
            <SearchSVG />
            <input
              type="text"
              placeholder={t('navbar.search')}
              className={clsx(
                'bg-transparent outline-none flex-shrink w-[100%] text-[16px]',
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

