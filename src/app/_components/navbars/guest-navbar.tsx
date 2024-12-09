'use client';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import GuestNavbarItem from './guest-navbar-item';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import useClickOutside from '@app/_hooks/useclickoutside';

const GuestNavbar = () => {
  const t = useTranslations();
  const fullPathname = usePathname();
  const navRef = useRef(null);
  const pathName = `/${fullPathname.split('/').slice(2).join('/')}`;
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    {
      path: '/',
      text: t('navbar.home'),
    },
    {
      path: '/about',
      text: t('navbar.about'),
    },
    {
      path: '/services',
      text: t('navbar.services'),
    },
    {
      path: '/solutions',
      text: t('navbar.solutions'),
    },
    {
      path: '/pricing',
      text: t('navbar.pricing'),
    },
    {
      path: '/contact',
      text: t('navbar.contact'),
    },
  ];

  useClickOutside(navRef, () => setIsOpen(false));

  return (
    <nav
      className="fixed h-guestNavHeight top-0 left-0 bg-gray-600 w-[100vw] flex items-center z-[999]"
      ref={navRef}>
      <div className="container mx-auto flex items-center gap-[80px] justify-between">
        <p>LOGO</p>
        <button
          className={clsx('2xl:hidden flex')}
          onClick={() => setIsOpen((oldValue) => !oldValue)}>
          =
        </button>

        <div
          className={clsx(
            'flex-grow',
            isOpen &&
              'absolute top-guestNavSpacing bg-slate-500 left-0 w-[100vw] flex py-[32px]',
            isOpen && '2xl:static 2xl:w-auto 2xl:bg-transparent 2xl:py-0',
            !isOpen && 'hidden 2xl:flex',
          )}>
          <div
            className={clsx(
              'flex items-center justify-between flex-grow',
              isOpen && 'container mx-auto items-stretch flex-wrap gap-[40px]',
            )}>
            <ul
              className={clsx(
                'flex items-center gap-[32px]',
                isOpen && 'flex-col items-stretch',
                isOpen && '2xl:flex-row 2xl:items-center',
              )}>
              {data.map((item) => {
                return (
                  <GuestNavbarItem
                    key={item.path}
                    path={item.path}
                    pathName={pathName}
                    text={item.text}
                  />
                );
              })}
            </ul>
            <ul
              className={clsx(
                'flex items-center text-[20px] text-textLight font-medium gap-[24px]',
                isOpen && 'flex-col justify-start items-stretch',
                isOpen && '2xl:flex-row 2xl:items-center',
              )}>
              <li className="flex">
                <Link
                  href={'/login'}
                  className="px-[20px] py-[10px] rounded-[8px] border-[1px] border-solid border-textLight">
                  {t('navbar.login')}
                </Link>
              </li>
              <li className="flex">
                <Link
                  href={'/register'}
                  className="px-[20px] py-[10px] rounded-[8px] bg-[#999999]">
                  {t('navbar.register')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GuestNavbar;

