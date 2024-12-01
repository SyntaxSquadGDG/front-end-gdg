'use client';
import React from 'react';
import FolderItem from './folder-item';

const Folders = ({folders}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-[32px] xl:mr-[432px]">
      {folders.map((folder) => {
        return (
          <FolderItem folder={folder} />
        )
      })}
    </div>
  );
};

export default Folders;

