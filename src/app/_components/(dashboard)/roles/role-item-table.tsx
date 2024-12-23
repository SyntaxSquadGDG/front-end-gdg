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

const RoleItemTable = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const { openModal } = useModal();
  return (
    <tr className="rounded-[32px] overflow-hidden">
      <td className="rounded-[32px]">
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
            <DeleteRoleModal id={role.id} />
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RoleItemTable;

