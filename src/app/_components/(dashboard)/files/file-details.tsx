'use client';

import Link from 'next/link';
import React from 'react';
import FileIcon from '../general/file-icon';
import ViewMetadataButton from './view-metadata-button';
import UploadNewVersionButton from './upload-new-version-button';
import DeleteFileButton from './delete-file-button';

const FileDetails = ({ file }) => {
  return (
    <div className="flex flex-col gap-24px">
      {/* FILE */}
      <Link
        href={`/files/${file.id}/preview`}
        className="flex gap-10px items-center justify-start flex-col md:flex-row">
        {/* Type */}
        <div>
          <FileIcon type={file.type} />
        </div>

        {/* Name + size */}
        <div className="flex flex-col gap-10px">
          <p className="text-black text-18px font-medium">{file.name}</p>
          <p className="text-textGray text-14px font-medium">{file.size}</p>
        </div>
      </Link>

      {/* actions */}
      <div className="flex gap-16px items-start md:items-center flex-col md:flex-row">
        <ViewMetadataButton id={file.id} />
        <UploadNewVersionButton id={file.id} />
        <DeleteFileButton file={file} />
      </div>
    </div>
  );
};

export default FileDetails;

