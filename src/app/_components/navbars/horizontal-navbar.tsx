'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import NotificationsSVG from '../svgs/navbars/notifications';
import SearchSVG from '../svgs/navbars/search';
import clsx from 'clsx';
import Link from 'next/link';
import { headFont } from '@/app/_utils/fonts';
import { formatDate } from '@/app/_utils/formats';
import OverlayImage from '../(dashboard)/general/overlay';
import { getLangDir } from 'rtl-detect';
import useClickOutside from '@app/_hooks/useclickoutside';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from './data/queries';
import DataFetching from '../(dashboard)/general/data-fetching';
import { getErrorText } from '@app/_utils/translations';
import useNetworkStatus from '@app/_hooks/useonline';
import { getCookie } from 'cookies-next';
import { decodeJWT } from '@app/_utils/auth';
import MenuBar from './menu-bars';

const HorizontalNavbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = getLangDir(locale);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const router = useRouter();
  const fullPathname = usePathname();
  const pathName = `/${fullPathname.split('/').slice(2).join('/')}`;
  const searchInputRef = useRef(null);

  useClickOutside(navbarRef, () => setIsOpen(false));

  const token = getCookie('token');
  const decodedToken = token ? decodeJWT(token) : null;
  const user = decodedToken.payload;

  useEffect(() => {
    if (!pathName.startsWith('/search') && searchInputRef.current) {
      searchInputRef.current.value = ''; // Clear the input field
    }
  }, [pathName]);

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;

    if (searchValue) {
      console.log(searchValue);
      router.push(`/search?q=${searchValue}`);
    }
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['myData'],
    queryFn: fetchUserData,
  });

  const errorText = getErrorText(
    t,
    `navbar.errors.${error?.message}`,
    `navbar.errors.USER_DATA_ERROR`,
  );

  console.log(data);
  // const isOnline = useNetworkStatus();

  return (
    <nav
      ref={navbarRef}
      className={clsx(
        'bg-whiteBackground pb-16px',
        direction === 'rtl'
          ? 'right-[calc(var(--verticalNavSmallWidth))] lg:right-[calc(var(--verticalNavWidth))]'
          : 'left-[calc(var(--verticalNavSmallWidth))] lg:left-[calc(var(--verticalNavWidth))]',
        'text-textLight h-horizontalNavHeight  w-[calc(100%-var(--verticalNavSmallWidth))] lg:w-[calc(100%-var(--verticalNavWidth))] fixed top-0 items-center flex flex-col z-[9999] px-32px bg-whiteBackground',
      )}>
      <div className="rounded-bl-navsRadius rounded-br-navsRadius h-[100%] bg-mainDashboardLinear w-[100%] relative">
        {/* <nav
      ref={navbarRef}
      className={clsx(
        direction === 'ltr'
          ? 'right-0 lg:right-0 '
          : 'left-0 lg:left-navsBodySpacing',
        'text-textLight bg-mainDashboardLinear h-horizontalNavHeight rounded-bl-navsRadius rounded-br-navsRadius w-[calc(100vw-var(--verticalNavSmallWidth)-var(--navsBodySpacing))] lg:w-[calc(100vw-var(--verticalNavWidth)-var(--navsBodySpacing))] fixed top-0 items-center flex z-[9999]',
      )}> */}
        <OverlayImage
          url="/images/navbar/background.png"
          className="rounded-br-navsRadius rounded-bl-navsRadius"
        />

        <div className="relative z-5 text-textLight flex justify-between items-center w-[100%] px-24px h-[100%]">
          {/* IMAGE + TEXT */}
          <div className="">
            <DataFetching
              data={[]}
              error={null}
              refetch={() => {}}
              className={''}
              isLoading={false}>
              {user && (
                <div className="flex gap-16px items-center">
                  {/* IMAGE */}
                  <div className="shrink-0 rounded-full overflow-hidden">
                    <Link
                      href={'/profile'}
                      className="hover:opacity-70 duration-500">
                      <Image
                        src={user.img}
                        className=" w-[56px] h-[56px]"
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 24px, 56px"
                        alt=""
                      />
                    </Link>
                  </div>

                  {/* TEXT */}
                  <div
                    className={clsx(
                      'hidden flex-col gap-10px xs:flex',
                      'font-head',
                    )}>
                    <p className="text-16px lg:text-24px">
                      {t('navbar.hello')}{' '}
                      <Link
                        href={'/profile'}
                        className="hover:text-secondaryColor1 duration-500">
                        {user.firstName}!
                      </Link>
                    </p>
                    <p className="text-12px lg:text-14px">
                      {formatDate(Date.now())}
                    </p>
                  </div>
                </div>
              )}
            </DataFetching>
          </div>
          <button
            className="flex lg:hidden mx-8px flex-col group"
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
              isOpen &&
                `flex top-0 left-0 w-[100%] ${
                  direction === 'ltr'
                    ? 'bg-horizontalNavLinear'
                    : 'bg-horizontalNavLinearRTL'
                }  rounded-[16px] py-16px px-24px`,
              'gap-16px items-center justify-between flex absolute',
              'lg:static lg:w-auto lg:px-0 lg:py-0 lg:rounded-none lg:bg-none',
              'duration-500',
              'max-xs:flex-col',
              isOpen
                ? 'lg:translate-y-0 translate-y-[var(--searchBarTop)]'
                : 'lg:translate-y-0 translate-y-[-500px]',
            )}>
            {/* SEARCH */}
            <form
              onSubmit={handleSubmit}
              className={clsx(
                'flex items-center gap-8px px-16px rounded-[16px] border-[1px] border-white border-solid w-[100%]',
              )}>
              <button className="flex py-10px group max-xs:hidden">
                <SearchSVG />
              </button>
              <div className="flex items-center justify-center h-fit">
                <input
                  type="text"
                  ref={searchInputRef}
                  placeholder={t('navbar.search')}
                  name="searchInput"
                  className={clsx(
                    'bg-transparent outline-none flex-shrink w-[100%] text-16px py-10px ',
                    'font-head',
                  )}
                />
              </div>
            </form>
            <Link href={'/notifications'} className="group">
              <NotificationsSVG
                active={pathName.startsWith('/notifications')}
              />
            </Link>
          </div>
        </div>
      </div>
      {/* {!isOnline && (
        <div
          className={clsx(
            direction === 'rtl'
              ? 'right-[calc(var(--verticalNavSmallWidth))] lg:right-[calc(var(--verticalNavWidth))]'
              : 'left-[calc(var(--verticalNavSmallWidth))] lg:left-[calc(var(--verticalNavWidth))]',
            'text-textLight h-horizontalNavHeight  w-[calc(100%-var(--verticalNavSmallWidth))] lg:w-[calc(100%-var(--verticalNavWidth))] fixed top-[32px] items-center flex flex-col z-[-1] px-32px',
          )}>
          <div className="relative z-5 text-textLight flex justify-center items-end w-[100%] px-24px h-[100%] bg-red-400 rounded-br-navsRadius rounded-bl-navsRadius">
            {t('general.offline')}
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default HorizontalNavbar;

