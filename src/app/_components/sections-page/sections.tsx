'use client';
import React from 'react';
import SectionItem from './section-item';

const Sections = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px] xl:mr-[432px]">
      <SectionItem />
      <SectionItem />
      <SectionItem />
      <SectionItem />
      <SectionItem />
      <SectionItem />
    </div>
  );
};

export default Sections;

