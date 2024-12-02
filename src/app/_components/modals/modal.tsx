'use client';

import { contentFont } from '@/app/_utils/fonts';
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
      <div className="bg-transparent p-[12px] w-11/12 md:w-1/2 relative">
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
          {children}
          <button
            onClick={() => onClose()}
            className={clsx(
              contentFont.className,
              'absolute right-0 top-0 w-[25px] h-[25px] rounded-full flex items-center justify-center font-bold text-textLight bg-red-500 z-50',
            )}>
            X
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

