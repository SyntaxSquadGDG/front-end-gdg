import React, { useRef, useState } from 'react';
import VerticalDotsSVG from '../../svgs/general/vertical-dots';
import ImageSVG from '../../svgs/files/image';
import WordSVG from '../../svgs/files/word';
import PdfSVG from '../../svgs/files/pdf';
import ExcelSVG from '../../svgs/files/excel';
import clsx from 'clsx';
import { contentFont } from '@/app/_utils/fonts';
import Link from 'next/link';
import Modal from '../modals/modal';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import useClickOutside from '@app/_hooks/useclickoutside';
import FileIcon from '../general/file-icon';
import DeleteFileModal from '../modals/delete-file-modal';

const FileItem = ({ file }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const t = useTranslations();
  const { openModal, closeModal, modalStack } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  useClickOutside(containerRef, () => setIsOpen(false));

  function handleDelete() {
    try {
      setIsDeleting(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
  }

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
            <button onClick={() => openModal(`deleteFileModal${file.id}`)}>
              Delete
            </button>
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
        {/* <ImageSVG /> */}
        <FileIcon type={file.type} />
      </Link>
      <div className={clsx(contentFont.className, 'flex flex-col gap-[10px]')}>
        <p className="text-[18px] font-medium">{file.name}</p>
        <p className="text-[14px] font-medium text-textGray">{file.size}</p>
      </div>

      <DeleteFileModal
        id={file.id}
        parentId={file.parentFolderId}
        redirect={false}
      />
    </div>
  );
};

export default FileItem;

