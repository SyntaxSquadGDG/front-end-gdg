'use client';
import React, { useState } from 'react';
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
import HelpSVG from '../svgs/navbars/help';
import PlansSVG from '../svgs/navbars/plans';
import Link from 'next/link';
import useNavbar from './hooks/use-navbar';
import Logout from './logout';

const VerticalNavbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const fullPathname = usePathname();
  const pathName = `/${fullPathname.split('/').slice(2).join('/')}`;

  const data = useNavbar();

  return (
    <nav
      className={clsx(
        direction === 'ltr'
          ? 'left-0 rounded-tr-navsRadius rounded-br-navsRadius'
          : 'right-0 rounded-tl-navsRadius rounded-bl-navsRadius',
        'h-screen w-verticalNavSmallWidth lg:w-verticalNavWidth bg-mainDashboardLinear fixed top-0 text-16px font-medium',
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
          'w-[100%] h-[100%] text-textLight relative z-[5] flex flex-col justify-between',
          'font-head',
        )}>
        <div className="px-32px">
          <p className="my-32px h-[40px]">
            <Link href={'/dashboard'} className="lg:text-16px text-12px">
              {t('logo')}
            </Link>
          </p>
          <ul className="vertical-list flex flex-col gap-32px overflow-auto h-[calc(100vh-40px-300px)] items-center lg:items-start">
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

        <div className="px-32px">
          <div className="flex flex-col gap-24px my-48px">
            <ul className="vertical-list flex flex-col gap-32px overflow-auto">
              <VerticalNavbarItem
                path={'/help'}
                pathName={pathName}
                text={t('navbar.help')}
                SVG={HelpSVG}
              />
            </ul>

            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;

