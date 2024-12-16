'use client';
import PathArrowSVG from '@app/_components/svgs/general/path-arrow';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const HeadBar = ({ SVG, items, children }) => {
  const divRef = useRef(null);
  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div
        style={{ height: divHeight ? `${divHeight}px` : 'auto' }}
        className="mt-[-24px] mb-[4px] z-[-1]"></div>
      <div
        ref={divRef}
        className={clsx(
          'flex items-center justify-between gap-[48px] bg-white',
          'fixed top-[var(--horizontalNavHeight)] py-[32px] w-[calc(100%-var(--verticalNavSmallWidth))] lg:w-[calc(100%-var(--verticalNavWidth))] z-[9999] lg:left-[var(--verticalNavWidth)] left-[var(--verticalNavSmallWidth)] px-[32px]',
        )}>
        <div className="flex items-center gap-[16px]">
          <ul className="flex items-center gap-[16px]">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <li className="flex items-center">
                  <Link
                    href={item.href}
                    className={clsx(
                      'text-[26px] font-medium',
                      contentFont.className,
                    )}>
                    {item.text}
                  </Link>
                </li>
                {index < items.length - 1 && <PathArrowSVG />}
              </React.Fragment>
            ))}
          </ul>

          {SVG && <SVG />}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default HeadBar;

