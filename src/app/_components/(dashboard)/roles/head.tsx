import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

const RoleHead = async ({ text, SVG, href, children }) => {
  return (
    <div className="flex items-center justify-between gap-[10px]">
      <div className="flex items-center gap-[10px] mb-[24px]">
        <h2 className={clsx(contentFont.className, 'text-[24px] font-medium')}>
          {text}
        </h2>
        {SVG && href && (
          <Link href={href}>
            <SVG />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default RoleHead;

