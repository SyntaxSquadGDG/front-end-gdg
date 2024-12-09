'use client';

import Link from 'next/link';
import React from 'react';

const VerticalNavbarItem = ({ path, pathName, text, SVG }) => {
  return (
    <li>
      <Link href={path}>
        <SVG active={pathName === path} />
        <p className={pathName === path ? 'active-link' : ''}>{text}</p>
      </Link>
    </li>
  );
};

export default VerticalNavbarItem;

