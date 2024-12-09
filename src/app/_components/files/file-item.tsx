import React, { useRef, useState } from 'react';
import VerticalDotsSVG from '../svgs/general/vertical-dots';
import ImageSVG from '../svgs/files/image';
import WordSVG from '../svgs/files/word';
import PdfSVG from '../svgs/files/pdf';
import ExcelSVG from '../svgs/files/excel';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import Link from 'next/link';
import Modal from '../modals/modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import useClickOutside from '@app/_hooks/useclickoutside';

const FileItem = ({ file }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const t = useTranslations();
  const { openModal, closeModal, modalStack } = useModal();

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      ref={containerRef}
      className="rounded-[16px] border-[1px] border-solid border-blue3 p-[24px]">
      <div className="relative flex justify-end">
        <button onClick={() => setIsOpen(true)}>
          <VerticalDotsSVG />
        </button>

        {isOpen && (
          <div className="absolute right-0 p-[24px] bg-slate-200 rounded-[16px] shadow-tableShadow">
            <button onClick={() => openModal('deleteModal')}>Delete</button>
          </div>
        )}
      </div>
      <Link
        href={`/files/${file.id}`}
        className="mt-[8px] mb-[22px] flex items-center justify-center">
        {/* {file.type === 'image' && <ImageSVG />}
        {file.type === 'word' && <WordSVG />}
        {file.type === 'pdf' && <PdfSVG />}
        {file.type === 'excel' && <ExcelSVG />} */}
        <ImageSVG />
      </Link>
      <div className={clsx(contentFont.className, 'flex flex-col gap-[10px]')}>
        <p className="text-[18px] font-medium">{file.name}</p>
        <p className="text-[14px] font-medium text-textGray">{file.size}</p>
      </div>

      <Modal
        isOpen={modalStack.includes('deleteModal')}
        onClose={closeModal}
        className={contentFont.className}>
        <h2 className="text-xl font-bold mb-[16px]">{t('files.delete')}</h2>
        <p className="text-xl font-bold mb-[12px]">
          {t('files.deleteDescription')}
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

export default FileItem;

