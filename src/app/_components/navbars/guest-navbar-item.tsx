import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const GuestNavbarItem = ({ path, pathName, text }) => {
  console.log(pathName);
  console.log(path);
  return (
    <li>
      <Link
        href={path}
        className={clsx(
          'font-content',
          'flex text-20px font-medium text-textLight px-28px py-14px rounded-[16px] hover:text-secondaryColor1 duration-500',
          pathName === path && 'bg-guestLinear',
        )}>
        <p className={pathName === path ? 'linearGuestText2' : ''}>{text}</p>
      </Link>
    </li>
  );
};

export default GuestNavbarItem;

