import SectionPage from '@/app/_components/(dashboard)/section-page/section-page';
import { fetcher } from '@/app/_utils/fetch';
import React from 'react';

const page = async ({ params }) => {
  const id = (await params).id;
  let sectionName;
  let folders;
  let path;

  try {
    const sectionNameData = await fetcher(`/Sections/SectioNameById?id=${id}`, {
      next: { revalidate: 0, tags: ['sectionNameData', id] },
    });
    sectionName = sectionNameData.name;
  } catch (e) {
    sectionName = '';
  }

  try {
    folders = await fetcher(`/Sections/FoldersByParentId?id=${id}`, {
      next: { revalidate: 0, tags: ['sectionFolders', id] },
    });
  } catch (e) {
    folders = null;
  }

  try {
    path = await fetcher(`/Sections/path?id=${id}`, {
      next: { revalidate: 0, tags: ['sectionPath', id] },
    });
  } catch (e) {
    path = null;
  }

  return (
    <SectionPage
      folders={folders}
      sectionName={sectionName}
      path={path}
      type="section"
      id={id}
    />
  );
};

export default page;

