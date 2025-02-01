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
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
        className,
      )}>
      <div className="bg-green-400 rounded-[16px] py-36px px-[50px] w-11/12 md:w-1/2 relative">
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh] bg-orange-400">
          {children}
          <button
            onClick={() => onClose()}
            className={clsx(
              'font-content',
              'absolute right-[10px] top-[8px] w-[25px] h-[25px] rounded-full flex items-center justify-center font-bold text-textLight bg-mainColor1 z-50',
            )}>
            <CloseModalSVG />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

