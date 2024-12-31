import DeleteSVG from '@app/_components/svgs/permissions/delete';
import { useModal } from '@app/_contexts/modal-provider';
import React, { useState } from 'react';
import DeleteRoleFromEmployeeModal from '../modals/delete-role-from-employee-modal';
import Link from 'next/link';
import DeleteModal from '../modals/delete-modal';
import { DeleteRoleFetch } from '@app/_utils/fetch/deletes';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useTranslations } from 'next-intl';

const RoleItemTable = ({ role, employeeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleRowClick = (e) => {
    // Prevent navigation if a button or link was clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
      return;
    }
    router.push(`/roles/${role.id}`);
  };

  async function handleDelete() {
    await DeleteRoleFetch(
      role.id,
      setIsDeleting,
      setErrorDeleting,
      onDeleteSuccess,
    );
  }

  async function onDeleteSuccess() {
    closeModal();
    queryClient.invalidateQueries(['roles']);
  }

  return (
    <tr className="cursor-pointer" onClick={handleRowClick}>
      <td>
        <div className="flex items-center justify-center">
          <img src="/images/defaults/user.png" alt="" />
        </div>
      </td>
      <td>
        <Link href={`/roles/${role.id}`}>{role.id}</Link>
      </td>
      <td>{role.name}</td>
      <td>
        <div className="flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() =>
                openModal(`deleteRole${role.id}FromEmployee${employeeId}`)
              }>
              <DeleteSVG />
            </button>

            <DeleteModal
              modalName={`deleteRole${role.id}FromEmployee${employeeId}`}
              head={t('roles.removeRoleFromEmployeeText')}
              isDeleting={isDeleting}
              error={errorDeleting}
              onClick={handleDelete}
            />

            {/* <DeleteRoleFromEmployeeModal id={role.id} /> */}
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RoleItemTable;

