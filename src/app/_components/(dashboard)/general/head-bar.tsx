'use client';
import PathArrowSVG from '@app/_components/svgs/general/path-arrow';
import useClickOutside from '@app/_hooks/useclickoutside';
import useElementHeight from '@app/_hooks/useheight';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const HeadBar = ({ SVG, items, children }) => {
  const divRef = useRef(null);
  const [divHeight, setDivHeight] = useState(0);
  const { ref, height } = useElementHeight();
  const dropDownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useClickOutside(dropDownRef, () => setIsDropdownOpen(false));

  return (
    <>
      <div
        style={{ height: height ? `${height + 4}px` : 'auto' }}
        // className="mt-[-24px] mb-4px z-[-1]"
      />
      <div
        ref={ref}
        className={clsx(
          'flex items-center justify-between gap-16px sm:gap-48px bg-whiteBackground flex-wrap',
          'fixed top-[var(--horizontalNavHeight)] pt-16px pb-32px w-[calc(100%-var(--verticalNavSmallWidth))] lg:w-[calc(100%-var(--verticalNavWidth))] z-[9999] lg:left-[var(--verticalNavWidth)] left-[var(--verticalNavSmallWidth)] px-32px',
        )}>
        <div className="flex items-center gap-16px">
          <ul
            className={clsx(
              'items-center gap-16px',
              items.length > 1 ? 'hidden md:flex' : 'flex',
            )}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <li className="flex items-center">
                  <Link
                    href={item.href}
                    className={clsx(
                      'text-26px font-medium',
                      'font-content',
                      'hover:opacity-70 duration-500',
                    )}>
                    {item.text}
                  </Link>
                </li>
                {index < items.length - 1 && <PathArrowSVG />}
              </React.Fragment>
            ))}
          </ul>
          <button
            onClick={toggleDropdown}
            className={clsx(
              'text-26px font-medium focus:outline-none',
              items.length > 1 ? 'md:hidden' : 'hidden',
            )}>
            &#8230; {/* Unicode for three dots */}
          </button>
          {isDropdownOpen && (
            <div
              className="md:hidden absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 z-50"
              ref={dropDownRef}>
              <ul className="flex flex-col gap-2 p-4">
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="flex gap-16px items-center">
                      <Link
                        href={item.href}
                        className={clsx(
                          'text-26px font-medium',
                          'font-content',
                          'hover:opacity-70 duration-500',
                        )}>
                        {item.text}
                      </Link>
                      {index < items.length - 1 && <PathArrowSVG />}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}

          {/* {SVG && <SVG />} */}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default HeadBar;

