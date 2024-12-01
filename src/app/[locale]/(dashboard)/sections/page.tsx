import SectionsPage from '@/app/_components/sections-page/sections-page';
import React from 'react';

const page = () => {
  const sections = [
    {
      id: 1,
      name: 'Section1',
      size: 1000,
      lastModified: '2024-01-01',
      numberOfFolders: 20,
      numberOfEmployees: 40,
    },
    {
      id: 2,
      name: 'Section2',
      size: 2000,
      lastModified: '2024-01-01',
      numberOfFolders: 30,
      numberOfEmployees: 50,
    },
  ];

  return <SectionsPage sections={sections} />;
};

export default page;

