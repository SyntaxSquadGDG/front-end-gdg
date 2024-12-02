import ActivitySection from '@/app/_components/activity-logs/activity-section';
import FileItem from '@/app/_components/files/file-item';
import Files from '@/app/_components/files/files';
import FoldersPage from '@/app/_components/folders-page/folders-page';
import { fetcher } from '@/app/_utils/fetch';
import React from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  let sectionName;
  let folderData;
  let path;

  try {
    const sectionNameData = await fetcher(
      `/Folders/SectionNameForFolder?id=${id}`,
      {
        next: { revalidate: 0, tags: ['folderSectionName', id] },
      },
    );
    sectionName = sectionNameData.name;
  } catch (e) {
    sectionName = '';
  }

  try {
    path = await fetcher(`/Folders/Path?id=${id}`, {
      next: { revalidate: 0, tags: ['folderPath', id] },
    });
  } catch (e) {
    path = null;
  }

  try {
    folderData = await fetcher(`/Folders/FoldersByParentId?id=${id}`, {
      next: { revalidate: 0, tags: ['folderData', id] },
    });
  } catch (e) {
    folderData = null;
  }

  return (
    <FoldersPage
      folderData={folderData}
      sectionName={sectionName}
      path={path}
      id={id}
      type="folder"
    />
  );
};

export default page;

