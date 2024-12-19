'use client';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import React, { useState } from 'react';
import ItemModal from '../modals/item-modal';
import DeleteFolderModal from '../modals/delete-folder-modal';
import Link from 'next/link';
import StackUsers from '../general/stack';

const FolderListItem = ({ folder, sectionName }) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  return (
    <tr
      key={folder.id}
      className="py-[40px] font-medium text-[18px] rounded-[32px]">
      <td>
        <Link href={`/folders/${folder.id}`}>{folder.name}</Link>
      </td>
      <td>{sectionName}</td>
      <td>{folder.numberOfFiles}</td>
      <td>{folder.lastModified}</td>
      <td>{folder.size}</td>
      <td>
        <div className="flex w-[100%] h-[100%] items-center justify-center">
          <StackUsers employeesCount={folder.numberOfEmployees} />
        </div>
      </td>
      <td>
        <div className="relative">
          <button onClick={() => setIsFolderOpen(true)}>
            <VerticalDotsSVG />
          </button>

          <ItemModal
            isOpen={isFolderOpen}
            setIsOpen={setIsFolderOpen}
            modalName={`deleteFolderModal${folder.id}`}
          />
          <DeleteFolderModal id={folder.id} />
        </div>
      </td>
    </tr>
  );
};

export default FolderListItem;

