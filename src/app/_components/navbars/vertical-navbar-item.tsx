'use client';

import Link from 'next/link';
import React from 'react';

const VerticalNavbarItem = ({ path, pathName, text, SVG }) => {
  const paths = pathName.split('/');
  console.log(paths);
  const finalPathName = `/${paths[1]}`;
  console.log(finalPathName);
  console.log(path);
  return (
    <li>
      <Link href={path}>
        <SVG active={finalPathName.startsWith(path) && paths.length === 2} />
        <p
          className={
            finalPathName.startsWith(path) && paths.length === 2
              ? 'active-link'
              : ''
          }>
          {text}
        </p>
      </Link>
    </li>
  );
};

export default VerticalNavbarItem;

