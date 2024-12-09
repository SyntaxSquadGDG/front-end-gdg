import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const GuestNavbarItem = ({ path, pathName, text }) => {
  return (
    <li>
      <Link
        href={path}
        className={clsx(
          contentFont.className,
          'flex text-[20px] font-medium text-textLight px-[28px] py-[14px] rounded-[16px]',
          pathName === path && 'bg-guestLinear',
        )}>
        <p className={pathName === path ? 'active-link' : ''}>{text}</p>
      </Link>
    </li>
  );
};

export default GuestNavbarItem;

