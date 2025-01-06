'use client';
import React, { useState } from 'react';
import Checkbox from '../general/checkbox';
import PermissionsHeadText from './permissions-head-text';
import { useTranslations } from 'next-intl';
import Button from '../general/button';
import PermissionsDiv from './permissions-div';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateEmployeesSectionPermissions,
  updateRolesSectionPermissions,
} from './data/updates';
import toast from 'react-hot-toast';
import { useModal } from '@app/_contexts/modal-provider';
import { getErrorText } from '@app/_utils/translations';
import ErrorAction from '../general/error-action';

const SectionFormPermissions = ({
  type,
  id,
  defaultPermissions,
  sectionId,
}) => {
  const [permissions, setPermissions] = useState(defaultPermissions || []); // Stores selected permissions
  const t = useTranslations();
  const disabledCondition = permissions.length === 0;
  const queryClient = useQueryClient();
  const [errorText, setErrorText] = useState(null);
  const { closeModal } = useModal();

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
        ? updateEmployeesSectionPermissions(sectionId, data)
        : updateRolesSectionPermissions(sectionId, data),
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
      <div className="">
        <PermissionsHeadText>
          {t('permissions.sectionPermissions')}
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

export default SectionFormPermissions;

