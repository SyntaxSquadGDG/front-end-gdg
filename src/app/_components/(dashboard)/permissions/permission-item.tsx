'use client';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import React, { useState } from 'react';
import ItemIcon from '../general/item-icon';
import { useModal } from '@app/_contexts/modal-provider';
import DeletePermissionFromEmployeeModal from '../modals/delete-permission-from-employee';
import EditSVG from '@app/_components/svgs/modals/edit';
import PermissionItemEditModal from '../modals/permission-item-edit-modal';
import SectionFormPermissions from '../permissions/section-form-permissions';
import FolderFormPermissions from '../permissions/folder-form-permissions';
import FileFormPermissions from '../permissions/file-form-permissions';
import DeleteModal from '../modals/delete-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useTranslations } from 'next-intl';
import { DeleteItemPermission } from '@app/_utils/fetch/deletes';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import { deleteEmployeePermission } from '../employees/data/deletes';
import { deleteRolePermission } from '../roles/data/deletes';

const PermissionItem = ({ item, type, id }) => {
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteModalHead =
    type === 'employee'
      ? t('permissions.removePermissionFromEmployeeText')
      : t('permissions.removePermissionFromRoleText');

  async function handleDelete() {
    setErrorText(null);
    mutation.mutate();
  }

  const mutation = useMutation({
    mutationFn: () =>
      type === 'employee'
        ? deleteEmployeePermission(id, item.id)
        : deleteRolePermission(id, item.id),
    onSuccess: async () => {
      queryClient.invalidateQueries([`${type}${id}Permissions`]);
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `permissions.errors.${error?.message}`,
        `permissions.errors.PERMISSION_DELETE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <tr key={`${item.type}${item.id}`}>
      <td className="py-[16px]">
        <div className="flex items-center gap-[18px] justify-start">
          <span>
            <ItemIcon type={item.type} />
          </span>
          <span>{item.name}</span>
        </div>
      </td>
      <td>
        <button
          onClick={() =>
            openModal(`permission${type}${id}Edit${item.type}${item.id}`)
          }>
          <div className="flex items-center justify-center gap-[10px]">
            <EditSVG />
            <p className="text-[20px] text-mainColor1">
              {t('permissions.edit')}
            </p>
          </div>
        </button>
      </td>
      <td>
        <div className="flex items-center gap-[10px] justify-end">
          <div className="relative">
            <button
              onClick={() =>
                openModal(
                  `deletePermissionFrom${type}${id}${item.type}${item.id}`,
                )
              }>
              <div className="flex items-center gap-[10px] justify-end">
                <DeleteSVG />
                <p className="text-[20px] text-dangerColor">
                  {t('permissions.remove')}
                </p>
              </div>
            </button>

            <DeleteModal
              head={deleteModalHead}
              modalName={`deletePermissionFrom${type}${id}${item.type}${item.id}`}
              isDeleting={mutation.isPending}
              error={errorText}
              onClick={handleDelete}
            />
            <PermissionItemEditModal
              type={type}
              id={id}
              itemType={item.type}
              itemId={item.id}>
              {item.type === 'section' && (
                <SectionFormPermissions
                  id={[id]}
                  type={type}
                  sectionId={item.id}
                  mode={'single'}
                />
              )}
              {item.type === 'folder' && (
                <FolderFormPermissions
                  id={[id]}
                  type={type}
                  folderId={item.id}
                  mode={'single'}
                />
              )}
              {item.type === 'file' && (
                <FileFormPermissions
                  id={[id]}
                  type={type}
                  fileId={item.id}
                  mode={'single'}
                />
              )}
            </PermissionItemEditModal>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default PermissionItem;

