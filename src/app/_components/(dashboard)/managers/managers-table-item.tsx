'use client';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import React, { useState } from 'react';
import ItemModal from '../modals/item-modal';
import ItemModalItem from '../modals/item-modal-item';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import EditSVG from '@app/_components/svgs/modals/edit';
import DeleteModal from '../modals/delete-modal';
import { handleRowClick } from './utils/functions';
import useManagerTableItem from './hooks/use-manager-table-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteManager } from './data/deletes';
import { useModal } from '@app/_contexts/modal-provider';
import { useRouter } from 'nextjs-toploader/app';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

const ManagerItemTable = ({ manager }) => {
  // const {
  //   isOpen,
  //   isDeleting,
  //   errorDeleting,
  //   openModal,
  //   handleDelete,
  //   setIsOpen,
  //   router,
  //   t,
  // } = useManagerTableItem(manager);

  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations();
  const { closeModal, openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const handleRowClick = (e) => {
    // Prevent navigation if a button or link was clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
      return;
    }
    router.push(`/managers/${manager.id}`);
  };

  async function handleDelete() {
    setErrorText(null);
    mutation.mutate(manager.id);
  }

  const mutation = useMutation({
    mutationFn: (id) => deleteManager(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['managers']);
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `managers.errors.${error?.message}`,
        `managers.errors.MANAGER_DELETE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <tr
      key={manager.id}
      onClick={(e) => handleRowClick(e)}
      className="cursor-pointer">
      <td>
        <div className="w-[40px] h-[40px] shrink-0">
          <img src="/images/defaults/user.png" alt="" />
        </div>
      </td>
      <td>
        <Link href={`/managers/${manager.id}`}>{manager.id}</Link>
      </td>
      <td>
        {manager.firstName} {manager.lastName}
      </td>
      <td>{manager.email}</td>
      <td>
        <div className="flex justify-end items-center">
          <div className="relative">
            <button onClick={() => setIsOpen(true)}>
              <VerticalDotsSVG />
            </button>

            <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ItemModalItem
                SVG={EditSVG}
                text={t('managers.editManager')}
                href={`/managers/${manager.id}/edit`}
                type="link"
              />
              <ItemModalItem
                SVG={RemoveSVG}
                text={t('managers.removeManager')}
                type="button"
                onClick={() => openModal(`deleteManager${manager.id}`)}
              />
            </ItemModal>
            <DeleteModal
              head={t('managers.removeManagerText')}
              modalName={`deleteManager${manager.id}`}
              onClick={handleDelete}
              isDeleting={mutation.isPending}
              error={errorText}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ManagerItemTable;

