'use client';
import React from 'react';
import FolderItem from './folder-item';

const Folders = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px] xl:mr-[432px]">
      <FolderItem />
      <FolderItem />
      <FolderItem />
      <FolderItem />
      <FolderItem />
      <FolderItem />
    </div>
  );
};

export default Folders;

