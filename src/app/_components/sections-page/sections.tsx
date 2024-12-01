'use client';
import React from 'react';
import SectionItem from './section-item';

const Sections = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px] xl:mr-[432px]">
      {sections.map((section) => {
        return <SectionItem key={section.id} section={section} />;
      })}
    </div>
  );
};

export default Sections;

