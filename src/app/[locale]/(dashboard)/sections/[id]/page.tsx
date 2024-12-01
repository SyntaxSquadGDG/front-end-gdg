import SectionPage from '@/app/_components/section-page/section-page';
import React from 'react';

const page = () => {
  const sectionName = 'MySection';
  const folders = [
    {
      id: 1,
      name: 'Folder1',
      size: 1000,
      numberOfEmployees: 14,
      numberOfFolders: 20,
      numberOfFiles: 25,
      lastModified: '2024-02-02',
    },
    {
      id: 2,
      name: 'Folder2',
      size: 950,
      numberOfEmployees: 11,
      numberOfFolders: 10,
      numberOfFiles: 5,
      lastModified: '2024-02-02',
    },
  ];

  const path = [{ id: 1, name: 'Section1', type: 'section' }];
  return (
    <SectionPage folders={folders} sectionName={sectionName} path={path} />
  );
};

export default page;

