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

const EmployeeItemTable = ({ employee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const t = useTranslations();
  return (
    <tr key={employee.id}>
      <td>
        <div className="w-[40px] h-[40px] shrink-0">
          <img src="/images/defaults/user.png" alt="" />
        </div>
      </td>
      <td>
        <Link href={`/employees/${employee.id}`}>{employee.id}</Link>
      </td>
      <td>{employee.name}</td>
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
            <DeleteEmployeeModal id={employee.id} />
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeItemTable;

