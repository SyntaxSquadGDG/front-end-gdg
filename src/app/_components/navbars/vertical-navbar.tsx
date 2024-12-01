'use client';
import Link from 'next/link';
import React from 'react';
import HomeSVG from '../svgs/navbars/home';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import './navbars.css';
import clsx from 'clsx';
import { headFont } from '@/app/_utils/fonts';
import SectionsSVG from '../svgs/navbars/sections';
import EmployeesSVG from '../svgs/navbars/employees';
import RolesSVG from '../svgs/navbars/roles';
import ActivitySVG from '../svgs/navbars/activity';
import ProfileSVG from '../svgs/navbars/profile';
import LogoutSVG from '../svgs/navbars/logout';
// import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const VerticalNavbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const fullPathname = usePathname();
  const pathName = `/${fullPathname.split('/').slice(2).join('/')}`;
  console.log(pathName);

  function handleLogout() {
    deleteCookie('token');
  }

  return (
    <nav
      className={
        'h-screen w-[100px] lg:w-[213px] rounded-tr-bigRounded rounded-br-bigRounded bg-gradient-to-b from-blue1 to-blue2 fixed top-0 left-0 text-[16px]'
      }>
      <div
        className={
          "absolute inset-0 bg-[url('/images/navbar/background.png')] bg-cover bg-center mix-blend-multiply rounded-br-bigRounded rounded-tr-bigRounded z-0"
        }
      />

      <div
        className={clsx(
          'w-[100%] h-[100%] text-[white] relative z-[5] flex flex-col justify-between px-[32px]',
          headFont.className,
        )}>
        <div>
          <p className="my-[32px]">LOGO</p>
          <ul className="vertical-list flex flex-col gap-[32px]">
            <li>
              <Link href={'/dashboard'}>
                <HomeSVG active={pathName === '/dashboard'} />
                <p className={pathName === '/dashboard' ? 'gradient-text' : ''}>
                  {t('navbar.home')}
                </p>
              </Link>
            </li>
            <li>
              <Link href={'/sections'}>
                <SectionsSVG active={pathName === '/sections'} />
                <p className={pathName === '/sections' ? 'gradient-text' : ''}>
                  {t('navbar.sections')}
                </p>
              </Link>
            </li>
            <li>
              <Link href={'/employees'}>
                <EmployeesSVG active={pathName === '/employees'} />
                <p className={pathName === '/employees' ? 'gradient-text' : ''}>
                  {t('navbar.employees')}
                </p>
              </Link>
            </li>
            <li>
              <Link href={'/roles'}>
                <RolesSVG active={pathName === '/roles'} />
                <p className={pathName === '/roles' ? 'gradient-text' : ''}>
                  {t('navbar.roles')}
                </p>
              </Link>
            </li>
            <li>
              <Link href={'/activity'}>
                <ActivitySVG active={pathName === '/activity'} />
                <p className={pathName === '/activity' ? 'gradient-text' : ''}>
                  {t('navbar.activity')}
                </p>
              </Link>
            </li>
            <li>
              <Link href={'/profile'}>
                <ProfileSVG active={pathName === '/profile'} />
                <p className={pathName === '/profile' ? 'gradient-text' : ''}>
                  {t('navbar.profile')}
                </p>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <button
            className="logoutButton my-[48px]"
            onClick={() => handleLogout()}>
            <LogoutSVG />
            <p>{t('navbar.logout')}</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;

