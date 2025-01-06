'use client';
import ViewSVG from '@app/_components/svgs/employees/view';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import React, { useState } from 'react';
import ItemModal from '../modals/item-modal';
import ItemModalItem from '../modals/item-modal-item';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import EditSVG from '@app/_components/svgs/modals/edit';
import { useTranslations } from 'use-intl';
import { useModal } from '@app/_contexts/modal-provider';
import { useRouter } from 'nextjs-toploader/app';
import DeleteModal from '../modals/delete-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteEmployee, deleteEmployee } from './data/deletes';
import { getErrorText } from '@app/_utils/translations';
import toast from 'react-hot-toast';

const EmployeeItemTable = ({ employee }) => {
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
    router.push(`/employees/${employee.id}`);
  };

  async function handleDelete() {
    setErrorText(null);
    mutation.mutate(employee.id);
  }

  const mutation = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['employees']);
      closeModal();
    },
    onError: (error) => {
      const textError = getErrorText(
        t,
        `employees.errors.${error?.message}`,
        `employees.errors.EMPLOYEE_DELETE_ERROR`,
      );
      setErrorText(textError);
      toast.error(textError);
    },
  });

  return (
    <tr key={employee.id} onClick={handleRowClick} className="cursor-pointer">
      <td>
        <div className="w-[40px] h-[40px] shrink-0 rounded-full overflow-hidden">
          <img
            src={employee.img || '/images/defaults/default-user.jpg'}
            alt=""
          />
        </div>
      </td>
      <td>
        <Link href={`/employees/${employee.id}`}>{employee.id}</Link>
      </td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      <td>
        <Link
          href={`/employees/${employee.id}/roles`}
          className="flex items-center gap-[8px] justify-center">
          <ViewSVG />
          <p>{t('employees.view')}</p>
        </Link>
      </td>
      <td>{employee.email}</td>
      <td>
        <div className="flex justify-end items-center">
          <div className="relative">
            <button onClick={() => setIsOpen(true)}>
              <VerticalDotsSVG />
            </button>

            <ItemModal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ItemModalItem
                SVG={EditSVG}
                text={t('employees.editEmployee')}
                href={`/employees/${employee.id}/edit`}
                type="link"
              />
              <ItemModalItem
                SVG={RemoveSVG}
                text={t('employees.removeEmployee')}
                type="button"
                onClick={() => openModal(`deleteEmployee${employee.id}`)}
              />
            </ItemModal>
            <DeleteModal
              head={t('employees.removeEmployeeText')}
              modalName={`deleteEmployee${employee.id}`}
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

export default EmployeeItemTable;

