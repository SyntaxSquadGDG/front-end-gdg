'use client';
import ViewSVG from '@app/_components/svgs/employees/view';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import React, { useState } from 'react';
import ItemModal from '../modals/item-modal';
import ItemModalItem from '../modals/item-modal-item';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import EditSVG from '@app/_components/svgs/modals/edit';
import DeleteEmployeeModal from '../modals/delete-employee-modal';
import { useTranslations } from 'use-intl';
import { useModal } from '@app/_contexts/modal-provider';
import { useRouter } from 'nextjs-toploader/app';
import DeleteModal from '../modals/delete-modal';
import { DeleteEmployeeFetch } from '@app/_utils/fetch/deletes';
import { revalidatePathAction } from '@app/actions';
import { useQueryClient } from '@tanstack/react-query';

const EmployeeItemTable = ({ employee }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations();
  const { closeModal } = useModal();

  const handleRowClick = (e) => {
    // Prevent navigation if a button or link was clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
      return;
    }
    router.push(`/employees/${employee.id}`);
  };

  async function handleDelete() {
    await DeleteEmployeeFetch(
      employee.id,
      setIsDeleting,
      setErrorDeleting,
      onDeleteSuccess,
    );
  }

  async function onDeleteSuccess() {
    closeModal();
    queryClient.invalidateQueries(['employees']);

    // await revalidatePathAction('/employees');
    // router.push('/employees');
    // await revalidatePathAction('/employees');
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const { openModal } = useModal();
  return (
    <tr key={employee.id} onClick={handleRowClick} className="cursor-pointer">
      <td>
        <div className="w-[40px] h-[40px] shrink-0">
          <img src="/images/defaults/user.png" alt="" />
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
              isDeleting={isDeleting}
              error={errorDeleting}
            />
            {/* <DeleteEmployeeModal id={employee.id} /> */}
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeItemTable;

