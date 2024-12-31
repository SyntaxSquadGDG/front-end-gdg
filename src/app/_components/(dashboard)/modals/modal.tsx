'use client';

import { contentFont } from '@/app/_utils/fonts';
import CloseModalSVG from '@app/_components/svgs/general/close-modal';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CloseModalButton from './close-modal-button';

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  innerClassName = '',
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
        'fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm',
        className,
      )}>
      <div
        className={clsx(
          'bg-whiteBackground rounded-[16px] py-[36px] px-[50px] max-h-[98vh] overflow-y-auto w-[460px] relative',
          innerClassName,
        )}
        onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseModalButton onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}

