import ActivitySection from '@app/_components/(dashboard)/activity-logs/activity-section';
import FileItem from '@app/_components/(dashboard)/files/file-item';
import Files from '@app/_components/(dashboard)/files/files';
import FoldersPage from '@app/_components/(dashboard)/folders-page/folders-page';
import { fetcher } from '@app/_utils/fetch/fetch';
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
    path = await fetcher(`/Folders/path?id=${id}`, {
      next: { revalidate: 0, tags: ['folderPath', id] },
    });
  } catch (e) {
    path = null;
  }

  try {
    folderData = await fetcher(`/Folders/FoldersByParentId?id=${id}`, {
      next: { revalidate: 0, tags: ['folderData', id] },
    });
    console.log(folderData);
  } catch (e) {
    folderData = null;
    console.log('NULLLLLLLLL');
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

