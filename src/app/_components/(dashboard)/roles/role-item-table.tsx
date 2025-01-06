'use client';
import ViewSVG from '@app/_components/svgs/employees/view';
import React, { useState } from 'react';
import ItemModal from '../modals/item-modal';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import ItemModalItem from '../modals/item-modal-item';
import EditSVG from '@app/_components/svgs/modals/edit';
import { useTranslations } from 'use-intl';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import DeleteRoleModal from '../modals/remove-role-modal';
import { useModal } from '@app/_contexts/modal-provider';
import DeleteModal from '../modals/delete-modal';
import { DeleteRoleFetch } from '@app/_utils/fetch/deletes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { deleteRole } from './data/deletes';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';

const RoleItemTable = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errorText, setErrorText] = useState(null);

  const handleRowClick = (e) => {
    // Prevent navigation if a button or link was clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
      return;
    }
    router.push(`/roles/${role.id}`);
  };

  async function handleDelete() {
    setErrorText(null);
    mutation.mutate(role.id);
  }

  const mutation = useMutation({
    mutationFn: (id) => deleteRole(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['roles']);
      closeModal();
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
        <div className="w-[36px] h-[36px] shrink-0">
          <img src="/images/defaults/user.png" alt="" />
        </div>
      </td>
      <td>
        <Link href={`/roles/${role.id}`}>{role.id}</Link>
      </td>
      <td>{role.name}</td>
      <td>
        <Link
          href={`/roles/${role.id}/employees`}
          className="flex items-center justify-center gap-[8px]">
          <ViewSVG />
          <span>{role.employeesCount}</span>
        </Link>
      </td>
      <td>
        <div className="flex justify-end items-center">
          <div className="relative">
            <button onClick={() => setIsOpen(true)}>
              <VerticalDotsSVG />
            </button>

            <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ItemModalItem
                SVG={EditSVG}
                text={t('roles.editRole')}
                href={`/roles/${role.id}/edit`}
                type="link"
              />
              <ItemModalItem
                SVG={RemoveSVG}
                text={t('roles.removeRole')}
                type="button"
                onClick={() => openModal(`deleteRoleModal${role.id}`)}
              />
            </ItemModal>
            <DeleteModal
              modalName={`deleteRoleModal${role.id}`}
              head={t('roles.removeRoleText')}
              isDeleting={mutation.isPending}
              error={errorText}
              onClick={handleDelete}
            />
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RoleItemTable;

