'use client';
import React, { useEffect, useRef, useState } from 'react';
import SectionItemSVG from '../svgs/sections/section-item';
import SettingsSVG from '../svgs/general/settings';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import { useTranslations } from 'next-intl';
import StackUsers from '../general/stack';
import FolderItemSVG from '../svgs/folders/folder-item';
import Link from 'next/link';
import Modal from '../modals/modal';

const FolderItem = ({ folder, sectionName }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalId) => {
    setModalStack((prevStack) => [...prevStack, modalId]); // Push new modal to the stack
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1)); // Remove the top modal from the stack
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Change the state when clicking outside
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
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
            <p className="text-[18px] font-medium text-blue1">{folder.name}</p>
          </div>
        </Link>

        <div className="relative">
          <button onClick={() => setIsOpen(true)}>
            <SettingsSVG />
          </button>

          {isOpen && (
            <div className="absolute right-0 p-[24px] bg-slate-200 rounded-[16px] shadow-tableShadow">
              <button onClick={() => openModal('deleteModal')}>Delete</button>
            </div>
          )}
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

      <Modal
        isOpen={modalStack.includes('deleteModal')}
        onClose={closeModal}
        className={contentFont.className}>
        <h2 className="text-xl font-bold mb-[16px]">{t('folders.delete')}</h2>
        <p className="text-xl font-bold mb-[12px]">
          {t('folders.deleteDescription')}
        </p>
        <input
          type="submit"
          value={'Delete'}
          className="w-[100%] py-[20px] rounded-[8px] px-[16px] bg-red-400 outline-none text-textLight cursor-pointer"
        />
      </Modal>
    </div>
  );
};

export default FolderItem;

