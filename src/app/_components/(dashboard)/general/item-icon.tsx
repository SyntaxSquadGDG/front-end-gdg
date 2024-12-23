'use client';
import FileItemPermissionSVG from '@app/_components/svgs/files/file-item-permission';
import FolderItemPermissionSVG from '@app/_components/svgs/folders/folder-item-permission';
import SectionItemPermissionSVG from '@app/_components/svgs/sections/section-item-permission';
import React from 'react';

const ItemIcon = ({ type }) => {
  return (
    <React.Fragment>
      {type === 'section' && <SectionItemPermissionSVG />}
      {type === 'folder' && <FolderItemPermissionSVG />}
      {type === 'file' && <FileItemPermissionSVG />}
    </React.Fragment>
  );
};

export default ItemIcon;

