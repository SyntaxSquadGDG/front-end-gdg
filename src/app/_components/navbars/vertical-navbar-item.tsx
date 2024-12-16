'use client';

import Link from 'next/link';
import React from 'react';

const VerticalNavbarItem = ({ path, pathName, text, SVG }) => {
  return (
    <li>
      <Link href={path}>
        <SVG active={pathName.startsWith(path)} />
        <p className={pathName.startsWith(path) ? 'active-link' : ''}>{text}</p>
      </Link>
    </li>
  );
};

export default VerticalNavbarItem;

