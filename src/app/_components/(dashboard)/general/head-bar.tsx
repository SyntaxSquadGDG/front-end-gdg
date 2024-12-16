'use client';
import PathArrowSVG from '@app/_components/svgs/general/path-arrow';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const HeadBar = ({ SVG, items, children }) => {
  return (
    <div className="flex items-center justify-between gap-[48px] mb-[32px]">
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

        <SVG />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HeadBar;

