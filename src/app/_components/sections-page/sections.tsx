'use client';
import React from 'react';
import SectionItem from './section-item';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { getLangDir } from 'rtl-detect';

const Sections = ({ sections }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  return (
    <div
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px]',
        direction === 'ltr' ? 'xl:mr-[432px]' : 'xl:ml-[432px]',
      )}>
      {sections.map((section) => {
        return <SectionItem key={section.id} section={section} />;
      })}
    </div>
  );
};

export default Sections;

