'use client';
import React, { useState } from 'react';
import Checkbox from '../general/checkbox';
import Button from '../general/button';
import PermissionsHeadText from './permissions-head-text';
import { useTranslations } from 'next-intl';
import PermissionsDiv from './permissions-div';

const FolderFormPermissions = ({ type, id, multiple = false }) => {
  const defaultFolderPermissions = [];
  const defaultSubFolderPermissions = [];
  const defaultFilePermissions = [];
  const t = useTranslations();

  const [folderPermissions, setFolderPermissions] = useState(
    defaultFolderPermissions,
  );
  const [subFolderPermissions, setSubFolderPermissions] = useState(
    defaultSubFolderPermissions,
  );
  const [filePermissions, setFilePermissions] = useState(
    defaultFilePermissions,
  );

  const disabledCondition =
    filePermissions.length === 0 &&
    subFolderPermissions.length === 0 &&
    folderPermissions.length === 0;

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
      <div className="grid grid-cols-2 gap-[24px]">
        <div className="">
          <PermissionsHeadText>
            {t('permissions.foldersPermissions')}
          </PermissionsHeadText>
          <PermissionsDiv>
            {Array.from({ length: 5 }).map((_, index) => (
              <Checkbox
                key={`folder-${index}`}
                value={folderPermissions.includes(index)}
                disabled={index > 0 && !folderPermissions.includes(index - 1)}
                onChange={() => handleToggle('folder', index)}
                label={`Folder Permission ${index}`}
              />
            ))}
          </PermissionsDiv>
        </div>
        <div>
          <PermissionsHeadText>
            {t('permissions.subFoldersPermissions')}
          </PermissionsHeadText>
          <PermissionsDiv>
            {Array.from({ length: 5 }).map((_, index) => (
              <Checkbox
                key={`subFolder-${index}`}
                value={subFolderPermissions.includes(index)}
                disabled={
                  index > 0 && !subFolderPermissions.includes(index - 1)
                }
                onChange={() => handleToggle('subFolder', index)}
                label={`Subfolder Permission ${index}`}
              />
            ))}
          </PermissionsDiv>
        </div>
        <div>
          <PermissionsHeadText>
            {t('permissions.filesPermissions')}
          </PermissionsHeadText>
          <PermissionsDiv>
            {Array.from({ length: 5 }).map((_, index) => (
              <Checkbox
                key={`file-${index}`}
                value={filePermissions.includes(index)}
                disabled={index > 0 && !filePermissions.includes(index - 1)}
                onChange={() => handleToggle('file', index)}
                label={`File Permission ${index}`}
              />
            ))}
          </PermissionsDiv>
        </div>
      </div>

      <Button
        text={t('permissions.updateButton')}
        disabled={disabledCondition}
        className={'mt-[32px] w-[100%]'}
        onClick={() => {
          console.log(id);
          console.log(folderPermissions);
          console.log(subFolderPermissions);
          console.log(filePermissions);
        }}
      />
    </div>
  );
};

export default FolderFormPermissions;

