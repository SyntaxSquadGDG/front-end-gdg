'use client';
import React, { useState } from 'react';
import Checkbox from '../general/checkbox';

const FolderFormPermissions = ({ type, id }) => {
  const defaultFolderPermissions = [];
  const defaultSubFolderPermissions = [];
  const defaultFilePermissions = [];

  const [folderPermissions, setFolderPermissions] = useState(
    defaultFolderPermissions,
  );
  const [subFolderPermissions, setSubFolderPermissions] = useState(
    defaultSubFolderPermissions,
  );
  const [filePermissions, setFilePermissions] = useState(
    defaultFilePermissions,
  );

  // Handles toggling for any permission type
  const handleToggle = (type, index) => {
    const updatePermissions = (permissions, setPermissions) => {
      setPermissions((prev) => {
        if (prev.includes(index)) {
          // If unchecked, remove the permission and all permissions after it
          return prev.filter((perm) => perm < index);
        } else {
          // If checked, add it if the previous permissions are selected
          if (prev.includes(index - 1) || index === 0) {
            return [...prev, index].sort((a, b) => a - b);
          } else {
            alert(`You must enable permission ${index - 1} first.`);
            return prev;
          }
        }
      });
    };

    if (type === 'folder')
      updatePermissions(folderPermissions, setFolderPermissions);
    if (type === 'subFolder')
      updatePermissions(subFolderPermissions, setSubFolderPermissions);
    if (type === 'file') updatePermissions(filePermissions, setFilePermissions);
  };

  return (
    <div>
      <p>Folder Permissions</p>
      <div>
        <h4>Folder Permissions</h4>
        {Array.from({ length: 5 }).map((_, index) => (
          <Checkbox
            key={`folder-${index}`}
            value={folderPermissions.includes(index)}
            disabled={index > 0 && !folderPermissions.includes(index - 1)}
            onChange={() => handleToggle('folder', index)}
            label={`Folder Permission ${index}`}
          />
        ))}
      </div>
      <div>
        <h4>Subfolder Permissions</h4>
        {Array.from({ length: 5 }).map((_, index) => (
          <Checkbox
            key={`subFolder-${index}`}
            value={subFolderPermissions.includes(index)}
            disabled={index > 0 && !subFolderPermissions.includes(index - 1)}
            onChange={() => handleToggle('subFolder', index)}
            label={`Subfolder Permission ${index}`}
          />
        ))}
      </div>
      <div>
        <h4>File Permissions</h4>
        {Array.from({ length: 5 }).map((_, index) => (
          <Checkbox
            key={`file-${index}`}
            value={filePermissions.includes(index)}
            disabled={index > 0 && !filePermissions.includes(index - 1)}
            onChange={() => handleToggle('file', index)}
            label={`File Permission ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderFormPermissions;

