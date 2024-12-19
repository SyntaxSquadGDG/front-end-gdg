'use client';

import Link from 'next/link';
import React from 'react';

const VerticalNavbarItem = ({ path, pathName, text, SVG }) => {
  const finalPathName = `/${pathName.split('/')[1]}`;
  console.log(finalPathName);
  console.log(path);
  return (
    <li>
      <Link href={path}>
        <SVG active={finalPathName.startsWith(path)} />
        <p className={finalPathName.startsWith(path) ? 'active-link' : ''}>
          {text}
        </p>
      </Link>
    </li>
  );
};

export default VerticalNavbarItem;

