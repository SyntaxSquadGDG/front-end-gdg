'use client';

import DeleteSVG from '@app/_components/svgs/permissions/delete';
import React, { useState } from 'react';
import DeleteEmployeeFromRole from '../modals/delete-employee-from-role-modal';
import Link from 'next/link';
import { useModal } from '@app/_contexts/modal-provider';
import DeleteModal from '../modals/delete-modal';
import { useRouter } from 'nextjs-toploader/app';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';

const EmployeeItemTable = ({ employee, roleId }) => {
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const router = useRouter();
  const t = useTranslations();

  const handleRowClick = (e) => {
    // Prevent navigation if a button or link was clicked
    if (e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
      return;
    }
    router.push(`/employees/${employee.id}`);
  };

  async function handleDelete() {
    // await DeleteEmployeeFetch(
    //   employee.id,
    //   setIsDeleting,
    //   setErrorDeleting,
    //   onDeleteSuccess,
    // );
    console.log('DELETED');
  }

  async function onDeleteSuccess() {
    closeModal();
    queryClient.invalidateQueries(['employees']);
  }

  return (
    <tr key={employee.id} onClick={handleRowClick} className="cursor-pointer">
      <td>
        <div className="flex items-center justify-center">
          <img src="/images/defaults/user.png" alt="" />
        </div>
      </td>
      <td>
        <Link href={`/employees/${employee.id}`}>{employee.id}</Link>
      </td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      <td>{employee.email}</td>
      <td>
        <div className="flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() =>
                openModal(`deleteEmployee${employee.id}FromRole${roleId}`)
              }>
              <DeleteSVG />
            </button>

            <DeleteModal
              head={t('employees.removeEmployeeFromRoleText')}
              isDeleting={isDeleting}
              error={errorDeleting}
              modalName={`deleteEmployee${employee.id}FromRole${roleId}`}
              onClick={handleDelete}
            />
            {/* <DeleteEmployeeFromRole id={employee.id} /> */}
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeItemTable;

