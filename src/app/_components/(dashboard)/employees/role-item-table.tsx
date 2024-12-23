import DeleteSVG from '@app/_components/svgs/permissions/delete';
import { useModal } from '@app/_contexts/modal-provider';
import React from 'react';
import DeleteRoleFromEmployeeModal from '../modals/delete-role-from-employee-modal';
import Link from 'next/link';

const RoleItemTable = ({ role }) => {
  const { openModal } = useModal();

  return (
    <tr key={role.id}>
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
              onClick={() => openModal(`deleteRoleFromEmployee${role.id}`)}>
              <DeleteSVG />
            </button>

            <DeleteRoleFromEmployeeModal id={role.id} />
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RoleItemTable;

