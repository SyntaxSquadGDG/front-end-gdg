import SectionsPage from '@app/_components/(dashboard)/sections-page/sections-page';
import { fetcher } from '@/app/_utils/fetch';
import React from 'react';

const page = async () => {
  let sections;

  try {
    sections = await fetcher('/Sections/getallsections', {
      next: { revalidate: 0, tags: ['sections'] },
    });
    console.log(sections);
    // sections = sections.filter((section) => {
    //   return section.name === 'SyntaxSquad';
    // });
  } catch (e) {
    sections = null;
  }

  return <SectionsPage sections={sections} />;
};

export default page;

