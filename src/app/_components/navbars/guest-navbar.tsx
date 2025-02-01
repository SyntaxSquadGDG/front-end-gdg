'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import GuestNavbarItem from './guest-navbar-item';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import useClickOutside from '@app/_hooks/useclickoutside';
import MenuBar from './menu-bars';

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

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <nav
      className="fixed h-guestNavHeight top-0 left-0 w-full flex items-center z-[999] custom-blur text-textLight"
      ref={navRef}>
      <div className="container mx-auto flex items-center gap-80px justify-between">
        <Link href={'/'}>
          <p className="font-bold text-22px"> {t('logo')}</p>
        </Link>
        <button
          className="2xl:hidden block text-textLight focus:outline-none group"
          onClick={() => setIsOpen((prev) => !prev)}>
          <MenuBar
            isMenuOpen={isOpen}
            openStyle={'rotate-45 translate-y-1'}
            closeStyle={'mb-1'}
          />
          <MenuBar
            isMenuOpen={isOpen}
            openStyle={'opacity-0'}
            closeStyle={'mb-1'}
          />
          <MenuBar
            isMenuOpen={isOpen}
            openStyle={'-rotate-45 -translate-y-1'}
            closeStyle={'mb-1'}
          />
        </button>

        <div
          className={clsx(
            'z-[1000]  duration-500 2xl:static absolute ',
            'fixed top-0 custom-blur left-0 w-full flex py-32px',
            // isOpen && '2xl:static 2xl:w-auto 2xl:bg-transparent 2xl:py-0',
            // !isOpen && 'hidden 2xl:flex',
            isOpen
              ? '2xl:translate-y-0 translate-y-[var(--guestNavHeight)]'
              : '2xl:translate-y-0 translate-y-[-500px]',
          )}>
          <div
            className={clsx(
              'flex items-center justify-between flex-grow max-xs:flex-col max-xs:items-start',
              'container mx-auto items-stretch flex-wrap gap-40px',
            )}>
            <ul
              className={clsx(
                'flex items-center gap-4px',
                'flex-col 2xl:flex-row items-stretch',
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
                'flex items-center text-20px text-textLight font-medium gap-24px',
                'flex-col justify-start items-stretch',
                '2xl:flex-row 2xl:items-center',
              )}>
              <li className="flex">
                <Link
                  href={'/login'}
                  className="px-20px py-10px rounded-[8px] border-[1px] border-solid border-textLight hover:bg-textLight hover:text-textDark duration-500">
                  {t('navbar.login')}
                </Link>
              </li>
              <li className="flex">
                <Link
                  href={'/register'}
                  className="px-20px py-10px rounded-[8px] border-[1px] border-solid border-textLight hover:bg-textLight hover:text-textDark duration-500">
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

