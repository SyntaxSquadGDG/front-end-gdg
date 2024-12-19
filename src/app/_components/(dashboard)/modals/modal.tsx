'use client';

import { contentFont } from '@/app/_utils/fonts';
import CloseModalSVG from '@app/_components/svgs/general/close-modal';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  noOutside,
  ...props
}) {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    onClose(); // Close modal on outside click
  };

  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (modalRef.current && !modalRef.current.contains(e.target)) {
  //       console.log('out');
  //       onClose(); // Close modal on outside click
  //     }
  //   };

  //   // Disable scrolling on body when the modal is open
  //   if (isOpen) {
  //     document.addEventListener('mousedown', handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      {...props}
      onClick={noOutside ? () => {} : handleOutsideClick}
      className={clsx(
        'fixed inset-0 z-[9999999999999999] flex items-center justify-center bg-black bg-opacity-50',
        className,
      )}>
      <div
        className="bg-whiteBackground rounded-[16px] py-[36px] px-[50px] w-11/12 md:w-1/2 relative"
        onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          onClick={() => onClose()}
          className={clsx(
            contentFont.className,
            'absolute right-[10px] top-[8px] w-[26px] h-[26px] rounded-full flex items-center justify-center font-bold text-textLight bg-mainColor1 z-50',
          )}>
          <CloseModalSVG />
        </button>
      </div>
    </div>,
    document.body,
  );
}

