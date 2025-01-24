'use client';
import React, { useEffect, useState } from 'react';
import Checkbox from '../general/checkbox';
import PermissionsHeadText from './permissions-head-text';
import { useTranslations } from 'next-intl';
import Button from '../general/button';
import PermissionsDiv from './permissions-div';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  updateEmployeesSectionPermissions,
  updateRolesSectionPermissions,
} from './data/updates';
import toast from 'react-hot-toast';
import { useModal } from '@app/_contexts/modal-provider';
import { getErrorText } from '@app/_utils/translations';
import ErrorAction from '../general/error-action';
import {
  fetchEmployeeSectionPermissions,
  fetchRoleSectionPermissions,
} from './data/queries';
import DataFetching from '../general/data-fetching';

const SectionFormPermissions = ({ type, id, sectionId, mode }) => {
  const [permissions, setPermissions] = useState([]); // Stores selected permissions
  const t = useTranslations();
  const disabledCondition = false;
  const queryClient = useQueryClient();
  const [errorText, setErrorText] = useState(null);
  const { closeModal } = useModal();
  const isSingle = mode === 'single';

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
      if (isSingle) {
        queryClient.invalidateQueries([
          `${type}${id[0]}${sectionId}Permissions`,
          `${type}${id[0]}Permissions`,
        ]);
      } else {
        id.map((itemId) => {
          queryClient.invalidateQueries([
            `${type}${itemId}${sectionId}Permissions`,
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
    queryKey: [`${type}${id[0]}${sectionId}Permissions`],
    queryFn:
      type === 'employee'
        ? () => fetchEmployeeSectionPermissions(id[0], sectionId)
        : () => fetchRoleSectionPermissions(id[0], sectionId),
    enabled: isSingle,
  });

  useEffect(() => {
    if (data) {
      setPermissions(data);
    }
  }, [data]);

  const textError = getErrorText(
    t,
    `permissions.errors.${error?.message}`,
    `permissions.errors.PERMISSIONS_LOAD_ERROR`,
  );

  const permissionLabels = [
    'View Section',
    'Edit Section',
    'Create/Upload Folders',
    'Delete Folders',
  ];

  return (
    <DataFetching
      isLoading={isSingle ? isPending : false}
      data={isSingle ? data : []}
      error={isSingle ? error && textError : null}
      refetch={isSingle ? refetch : () => {}}>
      <div>
        <div className="">
          <PermissionsHeadText>
            {t('permissions.sectionPermissions')}
          </PermissionsHeadText>
          <PermissionsDiv>
            {permissionLabels.map((item, index) => (
              <Checkbox
                key={index}
                value={permissions.includes(index)}
                disabled={
                  (index > 0 && !permissions.includes(index - 1)) ||
                  mutation.isPending
                }
                onChange={() => handleToggle(index)}
                label={item}
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
    </DataFetching>
  );
};

export default SectionFormPermissions;

