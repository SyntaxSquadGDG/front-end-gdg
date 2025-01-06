import DeleteSVG from '@app/_components/svgs/permissions/delete';
import { useModal } from '@app/_contexts/modal-provider';
import React, { useState } from 'react';
import Link from 'next/link';
import DeleteModal from '../modals/delete-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useTranslations } from 'next-intl';
import { deleteRoleFromEmployee } from '../roles/data/deletes';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';

const RoleItemTable = ({ role, employeeId }) => {
  const t = useTranslations();
  const [errorText, setErrorText] = useState(null);
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
    setErrorText(null);
    mutation.mutate();
  }

  const mutation = useMutation({
    mutationFn: () => deleteRoleFromEmployee(role.id, [employeeId]),
    onSuccess: async () => {
      closeModal();
      queryClient.invalidateQueries(['employeeRoles', employeeId]);
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `roles.errors.${error?.message}`,
        `roles.errors.ROLE_DELETE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

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
              isDeleting={mutation.isPending}
              error={errorText}
              onClick={handleDelete}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RoleItemTable;

