'use client';
import VerticalDotsSVG from '@app/_components/svgs/general/vertical-dots';
import Link from 'next/link';
import React from 'react';
import ItemModal from '../modals/item-modal';
import ItemModalItem from '../modals/item-modal-item';
import RemoveSVG from '@app/_components/svgs/modals/remove';
import EditSVG from '@app/_components/svgs/modals/edit';
import DeleteModal from '../modals/delete-modal';
import { handleRowClick } from './utils/functions';
import useManagerTableItem from './hooks/use-manager-table-item';

const ManagerItemTable = ({ manager }) => {
  const {
    isOpen,
    isDeleting,
    errorDeleting,
    openModal,
    handleDelete,
    setIsOpen,
    router,
    t,
  } = useManagerTableItem(manager);

  return (
    <tr
      key={manager.id}
      onClick={(e) => handleRowClick(router, manager, e)}
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
              isDeleting={isDeleting}
              error={errorDeleting}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ManagerItemTable;

