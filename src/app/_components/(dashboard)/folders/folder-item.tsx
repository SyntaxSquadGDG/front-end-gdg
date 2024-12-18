'use client';
import React, { useEffect, useRef, useState } from 'react';
import SettingsSVG from '../../svgs/general/settings';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import { useTranslations } from 'next-intl';
import StackUsers from '../general/stack';
import FolderItemSVG from '../../svgs/folders/folder-item';
import Link from 'next/link';
import Modal from '../modals/modal';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@/app/actions';
import { usePathname } from 'next/navigation';
import useClickOutside from '@app/_hooks/useclickoutside';
import ItemModal from '../modals/item-modal';
import DeleteFolderModal from '../modals/delete-folder-modal';

const FolderItem = ({ folder, sectionName }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const { openModal, closeModal, modalStack } = useModal();
  const path = usePathname();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Folders/deletefolderbyid?id=${folder.id}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) {
        throw new Error('error');
      }
      console.log(res);
      closeModal();
      toast.success('Deleted Successfully');
      await revalidatePathAction(path);
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(
          contentFont.className,
          'p-[16px] rounded-[16px] border-[1px] border-solid border-blue3 flex flex-col gap-[45px]',
        )}>
        {/* Header */}
        <div className="flex justify-between items-center sm:flex-row flex-col">
          {/* Header Details */}
          <Link
            href={`/folders/${folder.id}`}
            className="flex gap-[16px] items-center sm:flex-row flex-col">
            <FolderItemSVG />

            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[12px] items-center">
                <p className="text-textGray font-medium text-[14px] sm:text-start text-center">
                  {sectionName}
                </p>
                <p className="text-textGray font-medium text-[14px] sm:text-start text-center">
                  |
                </p>

                <p className="text-textGray font-medium text-[14px] sm:text-start text-center">
                  {folder.numberOfFiles} files
                </p>
              </div>
              <p className="text-[18px] font-medium text-blue1">
                {folder.name}
              </p>
            </div>
          </Link>

          <div className="relative">
            <button onClick={() => setIsOpen(true)}>
              <SettingsSVG />
            </button>

            <ItemModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              modalName={`deleteFolderModal${folder.id}`}
            />
            <DeleteFolderModal id={folder.id} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-[16px] py-[10px] bg-cardColor flex justify-between gap-[24px] lg:gap-[48px] items-center rounded-[8px] sm:flex-row flex-col">
          {/* Storage */}
          <div className="flex flex-col gap-[20px] flex-grow sm:w-auto w-[100%]">
            <p className="text-[12px] text-blue1 font-medium sm:text-start text-center">
              {t('general.storage')}
            </p>
            <div className="bg-storageContainer h-[4px] w-[100%] rounded-full">
              <div
                className={clsx(
                  `w-[${folder.size}%] bg-blue1 h-[100%] rounded-full`,
                )}></div>
            </div>
          </div>
          {/* Employees */}
          <div className="flex flex-col gap-[8px] items-center sm:text-start text-center">
            <p>{folder.numberOfEmployees} Employee</p>

            {/* Stacked Images */}
            <StackUsers employeesCount={folder.numberOfEmployees} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderItem;

