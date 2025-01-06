'use client';
import React, { useState } from 'react';
import Checkbox from '../general/checkbox';
import Button from '../general/button';
import { useTranslations } from 'use-intl';
import PermissionsHeadText from './permissions-head-text';
import PermissionsDiv from './permissions-div';
import { useModal } from '@app/_contexts/modal-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateEmployeesFilePermissions,
  updateRolesFilePermissions,
} from './data/updates';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import ErrorAction from '../general/error-action';

const FileFormPermissions = ({ type, id, defaultPermissions = [], fileId }) => {
  const [permissions, setPermissions] = useState(defaultPermissions); // Stores selected permissions
  const disabledCondition = permissions.length === 0;
  const t = useTranslations();

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

  const queryClient = useQueryClient();
  const [errorText, setErrorText] = useState(null);
  const { closeModal } = useModal();

  async function handleUpdate() {
    setErrorText(null);
    const data = {
      permissions: permissions,
      Ids: id,
    };
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: (data) =>
      type === 'employee'
        ? updateEmployeesFilePermissions(fileId, data)
        : updateRolesFilePermissions(fileId, data),
    onSuccess: async () => {
      queryClient.invalidateQueries([`${type}${id}Permissions`]);
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

  return (
    <div>
      <div>
        <PermissionsHeadText>
          {t('permissions.filePermissions')}
        </PermissionsHeadText>
        <PermissionsDiv>
          {Array.from({ length: 5 }).map((_, index) => (
            <Checkbox
              key={index}
              value={permissions.includes(index)}
              disabled={
                (index > 0 && !permissions.includes(index - 1)) ||
                mutation.isPending
              }
              onChange={() => handleToggle(index)}
              label={`Permission ${index}`}
            />
          ))}
        </PermissionsDiv>
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
  );
};

export default FileFormPermissions;

