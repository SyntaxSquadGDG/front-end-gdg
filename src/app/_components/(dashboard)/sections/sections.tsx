'use client';
import React from 'react';
import SectionItem from './section-item';

const Sections = ({ sections }) => {
  return (
    <>
      {sections.map((section) => {
        return <SectionItem key={section.id} section={section} />;
      })}
    </>
  );
};

export default Sections;

