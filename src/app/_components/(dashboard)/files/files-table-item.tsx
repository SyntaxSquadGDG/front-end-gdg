'use client';

import React, { useState } from 'react';
import FileIcon from '../general/file-icon';
import Link from 'next/link';
import ItemModal from '../modals/item-modal';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import DeleteFileModal from '../modals/delete-file-modal';
import StackUsers from '../general/stack';
import FileSettings from './file-settings';

const FilesTableItem = ({ file, folderName, folderNameRequired }) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  return (
    <tr
      key={file.id}
      className="py-[40px] font-medium text-[18px] rounded-[32px]">
      <td>
        <Link href={`/files/${file.id}`}>
          <FileIcon type={file.type} />
        </Link>
      </td>
      <td>
        <Link href={`/files/${file.id}`}>{file.name}</Link>
      </td>
      {folderNameRequired && folderName && <td>{folderName}</td>}
      <td>{file.uploadedAt}</td>
      <td>{file.size}</td>
      <td>
        <div className="flex w-[100%] h-[100%] items-center justify-center">
          <StackUsers employeesCount={file.numberOfEmployees} />
        </div>
      </td>
      <td>
        <div className="relative">
          <FileSettings id={file.id} />
        </div>
      </td>
    </tr>
  );
};

export default FilesTableItem;

