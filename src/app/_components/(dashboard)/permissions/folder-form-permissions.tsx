'use client';
import React, { useEffect, useState } from 'react';
import Checkbox from '../general/checkbox';
import Button from '../general/button';
import PermissionsHeadText from './permissions-head-text';
import { useTranslations } from 'next-intl';
import PermissionsDiv from './permissions-div';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useModal } from '@app/_contexts/modal-provider';
import {
  updateEmployeesFolderPermissions,
  updateRolesFolderPermissions,
} from './data/updates';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import ErrorAction from '../general/error-action';
import {
  fetchEmployeeFolderPermissions,
  fetchRoleFolderPermissions,
} from './data/queries';
import DataFetching from '../general/data-fetching';

const FolderFormPermissions = ({ type, id, folderId, mode }) => {
  const t = useTranslations();

  const [folderPermissions, setFolderPermissions] = useState([]);
  const [subFolderPermissions, setSubFolderPermissions] = useState([]);
  const [filePermissions, setFilePermissions] = useState([]);
  const isSingle = mode === 'single';

  const disabledCondition = false;
  // const disabledCondition =
  //   filePermissions.length === 0 &&
  //   subFolderPermissions.length === 0 &&
  //   folderPermissions.length === 0;

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

  const queryClient = useQueryClient();
  const [errorText, setErrorText] = useState(null);
  const { closeModal } = useModal();

  async function handleUpdate() {
    setErrorText(null);
    const data = {
      permissions: {
        folderPermissions: folderPermissions,
        subFolderPermissions: subFolderPermissions,
        filePermissions: filePermissions,
      },
      Ids: id,
    };
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: (data) =>
      type === 'employee'
        ? updateEmployeesFolderPermissions(folderId, data)
        : updateRolesFolderPermissions(folderId, data),
    onSuccess: async () => {
      if (mode === 'single') {
        queryClient.invalidateQueries([
          `${type}${id[0]}${folderId}Permissions`,
          `${type}${id[0]}Permissions`,
        ]);
      } else {
        id.map((itemId) => {
          queryClient.invalidateQueries([
            `${type}${itemId}${folderId}Permissions`,
            `${type}${itemId}Permissions`,
          ]);
        });
      }
      toast.success(t('general.updated'));
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `permissions.errors.${error?.message}`,
        `permissions.errors.PERMISSIONS_UPDATE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  const { isPending, error, data, refetch } = useQuery({
    queryKey: [`${type}${id[0]}${folderId}Permissions`],
    queryFn:
      type === 'employee'
        ? () => fetchEmployeeFolderPermissions(id[0], folderId)
        : () => fetchRoleFolderPermissions(id[0], folderId),
    enabled: mode === 'single',
  });

  useEffect(() => {
    if (data) {
      setFolderPermissions(data.folderPermissions);
      setSubFolderPermissions(data.subFolderPermissions);
      setFilePermissions(data.filePermissions);
    }
  }, [data]);

  const textError = getErrorText(
    t,
    `permissions.errors.${error?.message}`,
    `permissions.errors.PERMISSIONS_LOAD_ERROR`,
  );

  const folderLabelsPermissions = [
    'View Folder',
    'Edit Folder',
    'Upload Files',
    'Delete Folder',
  ];

  const subFolderLabelsPermissions = [
    'View Folder',
    'Edit Folder',
    'Upload Files',
    'Delete Folder',
  ];

  const filesLabelsPermissions = ['View Files', 'Edit Files', 'Delete Files'];

  return (
    <DataFetching
      isLoading={isSingle ? isPending : false}
      data={isSingle ? data : []}
      error={isSingle ? error && textError : null}
      refetch={isSingle ? refetch : () => {}}>
      <div>
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="">
            <PermissionsHeadText>
              {t('permissions.foldersPermissions')}
            </PermissionsHeadText>
            <PermissionsDiv>
              {folderLabelsPermissions.map((item, index) => (
                <Checkbox
                  key={`folder-${index}`}
                  value={folderPermissions.includes(index)}
                  disabled={
                    (index > 0 && !folderPermissions.includes(index - 1)) ||
                    mutation.isPending
                  }
                  onChange={() => handleToggle('folder', index)}
                  label={item}
                />
              ))}
            </PermissionsDiv>
          </div>
          <div>
            <PermissionsHeadText>
              {t('permissions.subFoldersPermissions')}
            </PermissionsHeadText>
            <PermissionsDiv>
              {subFolderLabelsPermissions.map((item, index) => (
                <Checkbox
                  key={`subFolder-${index}`}
                  value={subFolderPermissions.includes(index)}
                  disabled={
                    (index > 0 && !subFolderPermissions.includes(index - 1)) ||
                    mutation.isPending
                  }
                  onChange={() => handleToggle('subFolder', index)}
                  label={item}
                />
              ))}
            </PermissionsDiv>
          </div>
          <div>
            <PermissionsHeadText>
              {t('permissions.filesPermissions')}
            </PermissionsHeadText>
            <PermissionsDiv>
              {filesLabelsPermissions.map((item, index) => (
                <Checkbox
                  key={`file-${index}`}
                  value={filePermissions.includes(index)}
                  disabled={
                    (index > 0 && !filePermissions.includes(index - 1)) ||
                    mutation.isPending
                  }
                  onChange={() => handleToggle('file', index)}
                  label={item}
                />
              ))}
            </PermissionsDiv>
          </div>
        </div>

        <Button
          text={t('permissions.updateButton')}
          disabled={disabledCondition || id.length === 0}
          isPending={mutation.isPending}
          isPendingText={t('general.updating')}
          className={'mt-[32px] w-[100%]'}
          onClick={() => handleUpdate()}
        />
        <ErrorAction>{errorText}</ErrorAction>
      </div>
    </DataFetching>
  );
};

export default FolderFormPermissions;

