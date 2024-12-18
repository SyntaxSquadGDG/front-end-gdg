'use client';
import React, { useRef, useState } from 'react';
import SectionItemSVG from '../../svgs/sections/section-item';
import SettingsSVG from '../../svgs/general/settings';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import { useTranslations } from 'next-intl';
import StackUsers from '@/app/_components/(dashboard)/general/stack';
import Link from 'next/link';
import Modal from '../modals/modal';
import { useModal } from '@app/_contexts/modal-provider';
import toast from 'react-hot-toast';
import { revalidatePathAction } from '@/app/actions';
import useClickOutside from '@app/_hooks/useclickoutside';
import ItemModal from '../modals/item-modal';
import DeleteSectionModal from '../modals/delete-section-modal';

const SectionItem = ({ section }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const { closeModal, modalStack, openModal } = useModal();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://syntaxsquad.runasp.net/api/Sections/deletesection?id=${section.id}`,
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
      await revalidatePathAction('/sections');
    } catch (e) {
      toast.error('Error while deleting section');
    } finally {
      setIsDeleting(false);
    }
  }

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      ref={containerRef}
      className={clsx(
        contentFont.className,
        'p-[16px] rounded-[16px] border-[1px] border-solid border-mainColor3 flex flex-col gap-[45px]',
      )}>
      {/* Header */}
      <div className="flex justify-between items-center sm:flex-row flex-col">
        {/* Header Details */}
        <Link
          href={`/sections/${section.id}`}
          className="flex gap-[16px] items-center sm:flex-row flex-col">
          <SectionItemSVG />

          <div className="flex flex-col gap-[8px]">
            <p className="text-textGray font-medium text-[14px] sm:text-start text-center">
              {section.numberOfFolders} folders
            </p>
            <p className="text-[18px] font-medium text-mainColor1">
              {section.name}
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
            modalName={`deleteModal${section.id}`}
          />
          <DeleteSectionModal id={section.id} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-[16px] py-[10px] bg-cardColor flex justify-between gap-[24px] lg:gap-[48px] items-center rounded-[8px] sm:flex-row flex-col">
        {/* Storage */}
        <div className="flex flex-col gap-[20px] flex-grow sm:w-auto w-[100%]">
          <p className="text-[12px] text-mainColor1 font-medium sm:text-start text-center">
            {t('general.storage')}
          </p>
          <div className="bg-storageContainer h-[4px] w-[100%] rounded-full">
            <div
              className={clsx(
                `w-[${section.size}%] bg-mainColor1 h-[100%] rounded-full`,
              )}></div>
          </div>
        </div>
        {/* Employees */}
        <div className="flex flex-col gap-[8px] items-center sm:text-start text-center">
          <p>{section.numberOfEmployees} Employee</p>

          {/* Stacked Images */}
          <StackUsers employeesCount={section.numberOfEmployees} />
        </div>
      </div>
    </div>
  );
};

export default SectionItem;

