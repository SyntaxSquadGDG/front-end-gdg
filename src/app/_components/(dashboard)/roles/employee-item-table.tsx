'use client';

import DeleteSVG from '@app/_components/svgs/permissions/delete';
import React from 'react';
import DeleteEmployeeFromRole from '../modals/delete-employee-from-role-modal';
import Link from 'next/link';
import { useModal } from '@app/_contexts/modal-provider';

const EmployeeItemTable = ({ employee }) => {
  const { openModal } = useModal();
  return (
    <tr key={employee.id}>
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
              onClick={() => openModal(`deleteEmployeeFromRole${employee.id}`)}>
              <DeleteSVG />
            </button>

            <DeleteEmployeeFromRole id={employee.id} />
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeItemTable;

