'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Tooltip from './tooltip';

const VerticalNavbarItem = ({ path, pathName, text, SVG }) => {
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef(null);

  const paths = pathName.split('/');
  const finalPathName = `/${paths[1]}`;
  const strokePaths = ['/plans', '/activities'];

  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li>
      <Link
        href={path}
        className="group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={linkRef}>
        <SVG
          active={finalPathName.startsWith(path) && paths.length === 2}
          className={clsx(
            'duration-500',
            strokePaths.includes(path)
              ? 'group-hover:stroke-secondaryColor1'
              : 'group-hover:fill-secondaryColor1',
          )}
        />
        <p
          className={clsx(
            'hidden lg:flex',
            finalPathName.startsWith(path) && paths.length === 2
              ? 'active-link'
              : 'group-hover:text-secondaryColor1 duration-500',
          )}>
          {text}
        </p>
      </Link>

      {/* Tooltip for small screens */}
      {isHovered && <Tooltip linkRef={linkRef} text={text} />}
    </li>
  );
};

export default VerticalNavbarItem;

