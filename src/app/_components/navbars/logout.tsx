'use client';

import React, { useRef, useState } from 'react';
import LogoutSVG from '../svgs/navbars/logout';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { revalidatePathAction } from '@app/actions';
import { deleteCookie } from 'cookies-next';
import Tooltip from './tooltip';

const Logout = () => {
  const t = useTranslations();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  async function handleLogout() {
    try {
      setIsPending(true);
      deleteCookie('token');
      await revalidatePathAction('/login');
      router.push('/login');
    } catch (e) {
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      className="logoutButton group"
      onClick={() => handleLogout()}
      disabled={isPending}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={linkRef}>
      <LogoutSVG className={'group-hover:fill-secondaryColor1 duration-500'} />
      <p className="group-hover:text-secondaryColor1 duration-500 hidden lg:flex">
        {isPending ? t('navbar.loggingOut') : t('navbar.logout')}
      </p>
      {isHovered && (
        <Tooltip
          linkRef={linkRef}
          text={isPending ? t('navbar.loggingOut') : t('navbar.logout')}
        />
      )}
    </button>
  );
};

export default Logout;

