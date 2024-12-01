import ActivitySection from '@/app/_components/activity-logs/activity-section';
import FileItem from '@/app/_components/files/file-item';
import Files from '@/app/_components/files/files';
import FoldersPage from '@/app/_components/folders-page/folders-page';
import React from 'react';

const page = () => {
  const sectionName = 'MySection';
  const path = [
    { name: 'Folder3', id: 4, type: 'folder' },
    { name: 'Folder2', id: 3, type: 'folder' },
    { name: 'Folder1', id: 2, type: 'folder' },
    { name: 'Section1', id: 1, type: 'section' },
  ];
  const folderData = {
    folders: [
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
    ],
    files: [
      {
        id: 1,
        name: 'File1',
        size: 1000,
        uploadedAt: '2024-02-02',
        blobToken: 'token',
        type: 'pdf',
      },
      {
        id: 2,
        name: 'File2',
        size: 1000,
        uploadedAt: '2024-02-02',
        blobToken: 'token',
        type: 'excel',
      },
    ],
  };
  return (
    <FoldersPage
      folderData={folderData}
      sectionName={sectionName}
      path={path}
    />
  );
};

export default page;

