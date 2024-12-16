'use client';
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
import { redirect, usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import OverlayImage from '../(dashboard)/general/overlay';
import VerticalNavbarItem from './vertical-navbar-item';
import { revalidatePathAction } from '@app/actions';

const VerticalNavbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const fullPathname = usePathname();
  const pathName = `/${fullPathname.split('/').slice(2).join('/')}`;
  const router = useRouter();

  const data = [
    {
      path: '/dashboard',
      text: t('navbar.home'),
      svg: HomeSVG,
    },
    {
      path: '/sections',
      text: t('navbar.sections'),
      svg: SectionsSVG,
    },
    {
      path: '/employees',
      text: t('navbar.employees'),
      svg: EmployeesSVG,
    },
    {
      path: '/roles',
      text: t('navbar.roles'),
      svg: RolesSVG,
    },
    {
      path: '/activity',
      text: t('navbar.activity'),
      svg: ActivitySVG,
    },
    {
      path: '/profile',
      text: t('navbar.profile'),
      svg: ProfileSVG,
    },
  ];

  async function handleLogout() {
    deleteCookie('token');
    await revalidatePathAction('/login');
    router.push('/login');
  }

  return (
    <nav
      className={clsx(
        direction === 'ltr'
          ? 'left-0 rounded-tr-navsRadius rounded-br-navsRadius'
          : 'right-0 rounded-tl-navsRadius rounded-bl-navsRadius',
        'h-screen w-verticalNavSmallWidth lg:w-verticalNavWidth bg-mainDashboardLinear fixed top-0 text-[16px] font-medium',
      )}>
      <OverlayImage
        url="/images/navbar/background.png"
        className={
          direction === 'ltr'
            ? 'rounded-tr-navsRadius rounded-br-navsRadius'
            : 'rounded-tl-navsRadius rounded-bl-navsRadius'
        }
      />

      <div
        className={clsx(
          'w-[100%] h-[100%] text-textLight relative z-[5] flex flex-col justify-between px-[32px]',
          headFont.className,
        )}>
        <div>
          <p className="my-[32px]">LOGO</p>
          <ul className="vertical-list flex flex-col gap-[32px]">
            {data.map((item) => {
              return (
                <VerticalNavbarItem
                  key={item.path}
                  path={item.path}
                  pathName={pathName}
                  text={item.text}
                  SVG={item.svg}
                />
              );
            })}
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

