'use client';
import DeleteSVG from '@app/_components/svgs/permissions/delete';
import React from 'react';
import ItemIcon from '../general/item-icon';
import { useTranslations } from 'use-intl';
import { useModal } from '@app/_contexts/modal-provider';
import DeletePermissionFromEmployeeModal from '../modals/delete-permission-from-employee';
import EditSVG from '@app/_components/svgs/modals/edit';

const PermissionItem = ({ item, employee }) => {
  const t = useTranslations();
  const { openModal } = useModal();
  return (
    <tr key={`${item.type}${item.id}`}>
      <td className="py-[16px]">
        <div className="flex items-center gap-[18px] justify-start">
          <span>
            <ItemIcon type={item.type} />
          </span>
          <span>{item.name}</span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <EditSVG />
        </div>
      </td>
      <td>
        <div className="flex items-center gap-[10px] justify-end">
          <div className="relative">
            <button
              onClick={() =>
                openModal(
                  `deletePermissionFromEmployee${employee.id}${item.id}${item.type}`,
                )
              }>
              <div className="flex items-center gap-[10px] justify-end">
                <DeleteSVG />
                <p className="text-[20px] text-dangerColor">
                  {t('permissions.remove')}
                </p>
              </div>
            </button>

            <DeletePermissionFromEmployeeModal
              id={`${employee.id}${item.id}${item.type}`}
            />
            {/* <DeleteFolderModal id={folder.id} /> */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default PermissionItem;

