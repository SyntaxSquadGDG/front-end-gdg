'use client';
import React, { useState } from 'react';
import Checkbox from '../general/checkbox';

const FileFormPermissions = ({ type, id }) => {
  const defaultPermissions = [];
  const [permissions, setPermissions] = useState(defaultPermissions); // Stores selected permissions

  const handleToggle = (index) => {
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

  return (
    <div>
      <p>File Permissions</p>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Checkbox
            key={index}
            value={permissions.includes(index)}
            disabled={index > 0 && !permissions.includes(index - 1)}
            onChange={() => handleToggle(index)}
            label={`Permission ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FileFormPermissions;

